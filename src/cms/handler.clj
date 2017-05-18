(ns cms.handler
  (:require
   [cms.db :as db]
   [cemerick.friend :as friend]
   [cemerick.friend.credentials :as creds]
   [cemerick.friend.workflows :as workflows]
   [compojure.core :refer [defroutes GET routes ANY POST]]
   [compojure.handler :as handler]
   [monger.collection :as mc]
   [ring.util.response :as resp]
   [compojure.route :as route]
   [ring.middleware.cors :refer [wrap-cors]]
   [ring.middleware.keyword-params :refer [wrap-keyword-params]]
   [ring.middleware.json :refer [wrap-json-response
                                 wrap-json-params]]
   [ring.middleware.params :refer [wrap-params]]
   [ring.middleware.multipart-params :refer [wrap-multipart-params]]
   [ring.middleware.nested-params :refer [wrap-nested-params]]
   [cms.api :as api]))

(defn users [s]
  (let [user (mc/find-one-as-map db/db :users {:username s})] ;; (def user (mc/....))
    (if user
      (assoc user :roles (if (:admin user) #{::admin} #{::user})))))

(def users2 {"root" {:username "root"
                    :password (creds/hash-bcrypt "admin_password")
                     :roles #{::admin}}
             "jane" {:username "jane"
                     :password (creds/hash-bcrypt "user_password")
                     :roles #{::user}}})

(derive ::admin ::user)

(defn my-cors [routes]
  (wrap-cors routes
             :access-control-allow-origin [#".*"]
             :access-control-allow-methods [:get :put :post :delete]))

(defn wrap-username [app]
  (fn [req]
    (println "\n\nreq" (str req) "\n\n")
    (app req)))

(defn user-auth []
  (:identity (friend/current-authentication)))

(defroutes app
  (GET "/" []  (friend/authorize
                #{::user}
                "<!doctype html> <html> <head> <meta charset=\"utf-8\"> <title>EM Connect and Influence Mapping</title> <meta name=\"description\" content=\"\"> <meta name=\"viewport\" content=\"width=device-width\"> <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> <link rel=\"stylesheet\" href=\"styles/vendor.css\"> <link rel=\"stylesheet\" href=\"styles/main.css\"> </head> <body ng-app=\"mediamapApp\"> <!--[if lte IE 8]>
    <p class=\"browsehappy\">You are using an <strong>outdated</strong> browser. Please <a href=\"http://browsehappy.com/\">upgrade your browser</a> to improve your experience.</p>
    <![endif]--> <!-- Add your site or application content here --> <div ng-controller=\"NavigationCtrl\" class=\"header\"> <div class=\"nav-black\"> <svg class=\"logo\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" viewBox=\"135.5 361.375 200 72\" overflow=\"visible\" enable-background=\"new 135.5 361.375 200 72\" xml:space=\"preserve\"> <path id=\"logo\" d=\"M159.23,431.966c-5.84-0.232-10.618-1.83-14.354-4.798c-0.713-0.567-2.412-2.267-2.982-2.984  c-1.515-1.905-2.545-3.759-3.232-5.816c-2.114-6.332-1.026-14.641,3.112-23.76c3.543-7.807,9.01-15.55,18.548-26.274  c1.405-1.578,5.589-6.193,5.616-6.193c0.01,0-0.218,0.395-0.505,0.876c-2.48,4.154-4.602,9.047-5.758,13.283  c-1.857,6.797-1.633,12.63,0.656,17.153c1.579,3.116,4.286,5.815,7.33,7.307c5.329,2.611,13.131,2.827,22.659,0.632  c0.656-0.152,33.162-8.781,72.236-19.176c39.074-10.396,71.049-18.895,71.054-18.888c0.011,0.009-90.78,38.859-137.911,59.014  c-7.464,3.191-9.46,3.997-12.969,5.229C173.76,430.721,165.725,432.224,159.23,431.966z\"/> </svg> <h1 class=\"nike\"><a href=\"/#/\">EM Connect and Influence Mapping</a></h1><div class=\"nav-main-menu\"> <ul> <li> <h3>MEDIA MAPS</h3> <ul> <li><div class=\"title-section pointer ng-click-active\" ng-click=\"goMyMaps()\">My maps</div></li><li><div class=\"title-section pointer\" ng-click=\"goPublicMaps()\">Public maps</div></li><li><div class=\"title-section pointer\" ng-click=\"goCreateMap()\">Create new map</div></li></ul> </li><li> <h3>MEDIA PROFILES</h3> <ul> <li><div class=\"title-section pointer ng-click-active\" ng-click=\"goCreateProfile()\">Create new profile</div></li><li><div class=\"title-section pointer\" ng-click=\"goCards()\">View/Edit profiles</div></li></ul> </li></ul> </div><div class=\"name-user pointer\"> <h3>{{user.username}}</h3> <div class=\"admin-photo\"><img ng-src=\"{{user.img || '../images/user.svg'}}\"></div> <div class=\"menu-admin\"> <div ng-if=\"user.admin\" class=\"edit-profile\"> <a href=\"/#/home-admin\">Admin</a> </div> <div class=\"log-out\"> <a href=\"/logout\">Log Out</a> </div> </div> </div> </div> </div> <div ng-view=\"\" class=\"content-box\"></div> <!-- Google Analytics: change UA-XXXXX-X to be your site's ID --> <script>!function(A,n,g,u,l,a,r){A.GoogleAnalyticsObject=l,A[l]=A[l]||function(){
       (A[l].q=A[l].q||[]).push(arguments)},A[l].l=+new Date,a=n.createElement(g),
                              r=n.getElementsByTagName(g)[0],a.src=u,r.parentNode.insertBefore(a,r)
     }(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

     ga('create', 'UA-XXXXX-X');
     ga('send', 'pageview');</script> <script src=\"scripts/vendor.js\"></script> <script src=\"scripts/scripts.js\"></script> </body> </html>"))
  (GET "/login" [] (resp/file-response "login.html" {:root "public"}))
  (GET "/map" [] (resp/file-response "map.html" {:root "public"}))
  (POST "/whoami" params (let [u (user-auth)]
                           (println "Im " u " - " (str (friend/current-authentication)) "\nparams whoami " (str params))
                           (api/json-response (api/format-id (friend/current-authentication)))))
  (route/files "")
  (friend/logout  (ANY "/logout" request (do
                                           (println "login out")
                                           (ring.util.response/redirect "/login")))))

(def app
 (-> (routes app api/api-routes)
   (friend/authenticate {:credential-fn (partial creds/bcrypt-credential-fn users)
                         :login-uri "/login"
                         :workflows [(workflows/interactive-form)]})
   (my-cors)
   (wrap-username)
   (wrap-params)
   (wrap-multipart-params)
   (wrap-keyword-params)
   (wrap-json-response)
   (wrap-json-params)
   (handler/site)))
