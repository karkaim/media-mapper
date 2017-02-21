(defproject cms "0.1.1-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[cheshire "5.3.1"]
                 [clj-http "1.1.2"]
                 [clj-pdf "2.0.9"]
                 [com.cemerick/friend "0.2.1"]
                 [com.novemberain/monger "3.0.0-rc2"]
                 [com.novemberain/pantomime "2.7.0"]
                 [compojure "1.3.4"]
                 [javax.servlet/servlet-api "2.5"]
                 [org.clojure/clojure "1.6.0"]
                 [org.clojure/data.codec "0.1.0"]
                 [ring-cors "0.1.6"]
                 [ring/ring-core "1.4.0"]
                 [ring/ring-json "0.3.1"]
                 [clojurewerkz/mailer "1.3.0"]
                 [image-resizer "0.1.9"]]
  :plugins [[lein-ring "0.9.6"]]
  :ring {:handler cms.handler/app
         :port 80
         :stacktraces? true
         :uberjar {:aot :all}})
