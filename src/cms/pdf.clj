(ns cms.pdf
  (:use clj-pdf.core)
  (:require [monger.collection :as mc]
            [monger.core :as mg]))

(def conn (mg/connect {:host "patz.mooo.com"}))
(def d "mediaMap")
(def db (mg/get-db conn d))

(def cards-meta
  {:title "Media Mapper"
   :left-margin   10
   :right-margin  10
   :top-margin    20
   :bottom-margin 20
   :subject "Some subject"
   :size :letter
   :orientation :landscape
   :author "Jorge Díaz"
   :creator "Jorge Díaz"
   :font {:size 11}
   :footer false
   :pages true})

(def card-template
  (template
   [:paragraph
    [:heading $name]
    [:chunk {:style :bold} "medias: "] (clojure.string/join  $medias ", ") "\n"
    [:chunk {:style :bold} "positions: "] (clojure.string/join  $positions ", ") "\n"
    [:chunk {:style :bold} "genres "] (clojure.string/join  $genres ", ")]))

(defn format-name [s]
  (if (> (count s) 14)
    (str (clojure.string/join "" (take 11 s)) "...")
    s))

(defn table [maps]
  "EMERGIN MARKETS STYLISTS"
  [:table {:align :center :border false :cell-border false :num-cols 7}
   (map (fn [x]
          [:table {:align :center :border false :num-cols 1 :spacing 0 :padding 0 :offset 0}
           [[:image (str "resources/public" (:img x))]
            [:chunk {:style :bolds :size 9 :align :center}] (format-name (.trim (:name x)))
            [:chunk {:size 8} (clojure.string/join ", " (:medias x))]
            [:chunk {:size 8} (clojure.string/join ", " (:positions x))]
            [:chunk {:size 8} (clojure.string/join ", " (:genres x))]]])
        maps)])
