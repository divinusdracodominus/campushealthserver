import sys
import psycopg2 as pg
import json

DB_NAME = "myhealth"
DB_USER = "cardinal"
DB_PASS = ""
DB_HOST = "192.168.122.1"
DB_PORT = "5432"

inbound = sys.argv[2]
if(inbound == None and inbound != "false" and inbound != "true"):
    print("please provide inbound flag")
    exit()

with open(sys.argv[1]) as data_file:
    data = json.load(data_file)
    conn = pg.connect(database=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        host=DB_HOST,
        port=DB_PORT)
    print("database connection successful")
    cursor = conn.cursor()
    total = len(data)
    current = 0
    for sms in data:
        body = None
        platform_id = None
        recipiend_id = None
        if "body" in sms:
            body = sms["body"]
        if "_id" in sms:
            platform_id = sms["_id"]
        if "recipient_id" in sms:
            recipiend_id = sms["recipient_id"]
        cursor.execute("""
            insert into smsdata 
            (thread_id, body, date, date_sent, recipient_id, inbound, platform_id) 
            values 
            (%s, %s, %s, %s, %s, %s, %s)""", 
            (sms["thread_id"], body, sms["date"], sms["date_sent"], recipiend_id, inbound, platform_id))
        conn.commit()
        print('progress: ' + str(current) + "/" + str(total), end='\r', flush=True)
        current = current + 1
    conn.commit()
