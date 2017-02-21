(ns cms.images
  (:require [clojure.java.io :as io]
            [pantomime.mime :as pm])
  (:import (org.apache.commons.codec.binary Base64)))


(defn read-file [file-path]
  (with-open [reader (io/input-stream file-path)]
    (let [length (.length (clojure.java.io/file file-path))
          buffer (byte-array length)]
      (.read reader buffer 0 length)
      buffer)))

(defn imgBase64Str [byte-array]
  (String. (Base64/encodeBase64 byte-array)))

(defn generate-img-src [file]
  (let [ext (pm/mime-type-of file)
        base64 (imgBase64Str (read-file file))]
    (str "data:" ext ";base64," base64)))
