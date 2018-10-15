# export URL='127.0.0.1:8001'
export URL=`chalice url`

export PIC='DustyMiller.JPG'


# (echo -n '{"data": "test"}') |
# curl -H "Content-Type: application/json"  -d @-  $URL




# echo

# echo "$URL"
echo
(echo -n '{"data": "'; base64 $PIC; echo '"}') |
curl -H "Content-Type: application/json" -d '{"data": "TEST"}' $URL


# (echo -n '{"data": "'; base64 $PIC; echo '"}') | curl --header "Content-Type: application/json" --request POST  --data @- $URL

# curl -d '{json:0}' -H 'Content-Type: application/json' $URL

echo

# (echo -n '{"data": "'; base64 $PIC; echo '"}') |
# curl -H "Content-Type: application/json" -d @-  $URL
