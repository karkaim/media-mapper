(ns cms.api
  (:require
   [cemerick.friend.credentials :as creds]
   [cms.db :as db]
   [cms.images :as img]
   [monger.collection :as mc]
   [monger.util :refer [object-id]]
   [clojure.java.shell :only [sh]]
   [compojure.core :refer [defroutes POST GET]]
   [cheshire.core :as json]
   [clojure.java.io :as io]
   [image-resizer.core :refer :all]
   [image-resizer.format :as format]
   [image-resizer.resize :refer :all]
   [image-resizer.scale-methods :refer :all]
   [ring.util.response :as resp]))
(import 'javax.imageio.ImageIO)
(resize-width-fn 400 ultra-quality)
(resize-height-fn 400 ultra-quality)

(defn json-string
  "Try to generate a JSON-encoding string for o.
  if fails, return (str o)"
  [o]
  (try (json/generate-string o)
       (catch  com.fasterxml.jackson.core.JsonGenerationException e (str o))))

(defn json-response [data & [status]]
  {:status (or status 200)
   :headers {"Content-Type" "application/json"}
   :body (json-string data)})


(defn get-base64 [file]
  (println "get-base64" (str file))
  (img/generate-img-src file))

(defn format-id [m]
  (-> m
      (assoc :id (str (:_id m)))
      (dissoc :_id)))

(defn smart_id
  "convierte un mapa con :id a :_id
  con _id como Object-Id"
  [va]
  (cond
    (map? va) (into {} (for [[k v] va] [k (smart_id v)]))
    (vector? va) (map smart_id va)
    :default (object-id va)))

(defn format_id [m]
  (if (:id m)
    (-> m
      (assoc :_id (smart_id (:id m)))
      (dissoc :id))
    m))

(defn find-cards [where]
  (let [where (format_id where)]
    (doall (map format-id (mc/find-maps db/db :cards where)))))

(defn find-map [where]
  (let [where (format_id where)]
    (doall (map format-id (mc/find-maps db/db :maps where)))))

(defn upsert-card [card]
  (if (:id card)
    (and (mc/update db/db :cards {:_id (object-id (:id card))} card) {:ok 1})
    (and (mc/insert db/db :cards card) {:ok 1})))

(defn delete-card [card]
  (and (mc/remove db/db :cards {:_id (object-id (:id card))}) {:ok (:id card)})
  {:res (str "deleted " (:id card))})

(defn upsert-map [map]
  (if (:id map)
    (and (mc/update db/db :maps {:_id (object-id (:id map))} map) {:id (:id map)})
    (format-id (mc/insert-and-return db/db :maps map))))

(defn find-catalogo [params]
  (doall (map format-id (mc/find-maps db/db :catalogo params))))

(defn upsert-catalogo [map]
  (if (:id map)
    (and (mc/update db/db :catalogo {:_id (object-id (:id map))} map) {:ok 1})
    (format-id (mc/insert-and-return db/db :catalogo map))))

(defn delete-catalogo [map]
  (and (mc/remove db/db :catalogo {:_id (object-id (:id map))}) {:ok 1}))

(defn delete-map [map]
    (and (mc/remove db/db :maps {:_id (object-id (:id map))}) {:ok 1}))

(defn upload-file
  [file]
  (let [img-name (str (java.util.UUID/randomUUID) "." (re-find #"[^/]+$" (:content-type file)))]
    (println "guardar " (str "public/imagescards/" img-name))
    (def toResize (ImageIO/read (file :tempfile)))
    (if (> (.getWidth toResize) (.getHeight toResize))
      (do (def toCrop (resize-to-height toResize 400))
        (clojure.java.io/copy
        (format/as-stream toCrop (re-find #"[^/]+$" (:content-type file)))
          (clojure.java.io/as-file (str "public/imagescards/" img-name)))
        (format/as-file 
          (crop-from toCrop (/ (- (.getWidth toCrop) 400) 2) 0 400 400)
          (str "public/imagescards/cropped/" img-name))
      )
      (do (def toCrop (resize-to-width toResize 400))
        (clojure.java.io/copy 
        (format/as-stream toCrop (re-find #"[^/]+$" (:content-type file)))
          (clojure.java.io/as-file (str "public/imagescards/" img-name)))
        (format/as-file 
          (crop-from toCrop 0 (/ (- (.getHeight toCrop) 400) 2) 400 400)
          (str "public/imagescards/cropped/" img-name))
    
      )
    )
;    (clojure.java.io/copy 
;        (format/as-stream (resize-to-height (file :tempfile) 400 (re-find #"[^/]+$" (:content-type file))))
;        (clojure.java.io/as-file (str "public/" img-name)))
    {:img (str "/imagescards/" img-name)}))

(defn find-users [where]
  (map format-id (map #(dissoc % :password)
                      (mc/find-maps db/db :users
                                    (format_id where)))))

(defn create-user [params]
  (if (:id params)
    (if (:password params)
      (and (mc/update db/db :users {:_id (object-id (:id params))}
                      (-> (dissoc params :id)
                        (update-in [:password] creds/hash-bcrypt))) {:ok 0})
      (let [oldp (:password (mc/find-one-as-map db/db :users {:_id (object-id (:id params))}))]
        (and (mc/update db/db :users {:_id (object-id (:id params))}
                        (-> (dissoc params :id)
                          (assoc  :password oldp))) {:ok 0})))
    (try (and (mc/insert db/db :users
                         (update-in params [:password]
                                    creds/hash-bcrypt)) {:ok 1})
         (catch Exception e {:ok 0}))))

(defn change-cards [m cards]
  (mc/update db/db :maps {:_id (:_id m)} {:$set {:cards cards}}))

(defn delete-user [m]
  (let [maps (mc/find-maps db/db :maps {:cards {:$elemMatch {:$eq (:id m)}}})]
    (dorun (map #(change-cards % (remove (fn [id] (= (:id m) id)) (:cards %))) maps))
    (and (mc/remove db/db :users {:_id (object-id (:id m))}) {:ok 1})))

(defroutes api-routes
  (POST "/api/users" {params :params}
        (do (println (str "get users " params))
            (json-response (find-users params))))

  (POST "/api/create-user" {params :params}
        (do (println (str "create user " params))
            (json-response (create-user params))))

  (POST "/api/delete-user" {params :params}
        (do (println (str "delete user " params))
            (json-response (delete-user params))))

  (POST "/api/file" {params :params}
        (do
          (println "\n\n\n file " params)
          (json-response (upload-file (:file params)))))

  (POST "/api/get-cards" {params :params}
        (do (println (str "request cards " params))
            (let [r (find-cards params)]
              (println "result length " (count r))
              (json-response (find-cards params)))))

  (GET "/api/get-carts" []
        (do (println (str "request all cards "))
            (let [r (find-cards {})]
              (println "result length " (count r))
              (json-response r))))

  (POST "/api/upsert-card" {params :params}
        (do (println (str "create card " (str (dissoc params :img))))
            (json-response (upsert-card params))))

  (POST "/api/delete-card" {params :params}
        (do (println (str "delete card " (str (dissoc params :img))))
            (json-response (delete-card params))))

  (POST "/api/get-maps" {params :params}
        (do (println (str "request maps " (str params)))
            (json-response (find-map params))))

  (POST "/api/upsert-map"  {params :params}
        (do (println (str "upsert map " (str params)))
            (json-response (upsert-map params))))

  (POST "/api/delete-map"  {params :params}
        (do (println (str "delete map " (str params)))
            (json-response (delete-map params))))

  (POST "/api/catalogo" {params :params}
        (json-response (find-catalogo params)))

  (POST "/api/upsert-catalogo" {params :params}
        (json-response (upsert-catalogo params)))

  (POST "/api/delete-catalogo" {params :params}
        (json-response (delete-catalogo params)))

  (POST "/api/base64" {params :params}
        (do (println "file upload" (str params))
            (json-response (get-base64 (get-in params [:file :tempfile])))))

  (POST "/api/pdf" {params :params}
        (do (println "downloadig pdf of map " (str params))
            (let [ex (clojure.java.shell/sh "phantomjs" "myExporter.js" (:id params) (str "public/pdf/" (:id params) ".pdf"))]
              (println "result " (str ex))
              {:ok (str "public/pdf/" (:id params) ".pdf")}))))


(defn fix-vecs [m k]
  (-> m
    (assoc
     k
     (map #(.trim %)
          (re-seq #"[^,]+" (.trim (get m k)))))))


(defn fix-card [m]
  (-> m
    (fix-vecs "territories")
    (fix-vecs "storylines")
    (fix-vecs "medias")
    (fix-vecs "positions")
    (fix-vecs "genres")))

(defn fix-img [m]
  (assoc m :img
         (str "url(" (img/generate-img-src
                      (str (re-find #"[^.]+" (:img m)) ".jpeg")) ")")))
