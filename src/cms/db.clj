(ns cms.db
  (:require
   [monger.core :as mg])
  (:import [com.mongodb MongoOptions ServerAddress]))

(def conn (mg/connect {:host "localhost"}))
(def d "devDB")
(def db (mg/get-db conn d))
(def user "cms")
(def password (.toCharArray "d3vServ3r!"))

;;(mg/authenticate db user password)
