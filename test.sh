MESSAGE=$1

curl -v -H "Accept: application/json" \
-H "Content-type: application/json" \
-X POST \
-d"{\"result\":[{\"content\":{\"toType\":1,\"createdTime\":1460345333834,\"from\":\"uc4d7c116bd548f9bce66cd0c17a57363\",\"location\":null,\"id\":\"4155999156090\",\"to\":[\"u85a2fefb9ffc22393ae16e88b523faa4\"],\"text\":\"$MESSAGE\",\"contentMetadata\":{\"AT_RECV_MODE\":\"2\"},\"deliveredTime\":0,\"contentType\":1,\"seq\":null},\"createdTime\":1460345333856,\"eventType\":\"138311609000106303\",\"from\":\"u206d25c2ea6bd87c17655609a1c37cb8\",\"fromChannel\":1341301815,\"id\":\"WB1520-3348000517\",\"to\":[\"u85a2fefb9ffc22393ae16e88b523faa4\"],\"toChannel\":1462432885}]}" \
http://localhost:8080/
