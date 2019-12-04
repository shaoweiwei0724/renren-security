# -*- coding: utf-8 -*-


import sifany_util
import time
import redis
import random
setting_path='setting-data.json'

conn,cursor,setting=sifany_util.get_sql_conn2(setting_path)
redis_conn=redis.Redis(host=setting['redis_ip'],port=setting['redis_port'])

sql = "select id from sifany_obj_data"
cursor.execute(sql)
    
ids = cursor.fetchall()

while True:
    for id_ in ids:
        key = id_[0]
        value = random.uniform(0, 1000)
        value=int(value*100)/100
        print(key,'  ',value)
        redis_conn.hset('sifany_obj_data',key,value)
    time.sleep(1)
        
