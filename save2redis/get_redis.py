# -*- coding: utf-8 -*-
"""
Created on Sat Nov  2 16:02:02 2019

@author: Administrator
"""

import sifany_util
import time
import redis

setting_path='setting-data.json'

conn,cursor,setting=sifany_util.get_sql_conn2(setting_path)
redis_conn=redis.Redis(host=setting['redis_ip'],port=setting['redis_port'])

sql = "select id from sifany_obj_data"
cursor.execute(sql)
    
ids = cursor.fetchall()

while True:
    for id_ in ids:
        key = id_[0]
        data = redis_conn.hget('sifany_obj_data',key)
        
        print(key,float(data))
    time.sleep(5)


