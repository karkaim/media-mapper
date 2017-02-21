(ns cms.email)
(:require 
    [clojurewerkz.mailer.core :refer 
        [delivery-mode! with-settings with-defaults with-settings build-email deliver-email]]))

(delivery-mode! : test)


(defn send
  (build-email {:from "Joe The Robot", :to ["qi.volmar@gmai.com"] :subject "Check this influencer profile!"}
  "email/templates/warning.mustache" {:name "Joe" :host "host3.megacorp.internal"}))
