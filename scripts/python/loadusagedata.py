import sys
import psycopg2 as pg
import json

DB_NAME = "myhealth"
DB_USER = "cardinal"
DB_PASS = ""
DB_HOST = "192.168.122.1"
DB_PORT = "5432"

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
    for event in data:
        print('progress: ' + str(current) + "/" + str(total), end='\r', flush=True)
        current = current + 1
        cursor.execute("""
            insert into appusageevents 
            (package_name, date, kind, platform_type) 
            values 
            (%s, %s, %s, %s) on conflict do nothing""", 
            (event["package_name"], event["date"], event["kind"], event["platform_type"]))
        conn.commit()
