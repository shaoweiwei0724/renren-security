# -*- coding: utf-8 -*-
"""
Created on Mon Nov 19 16:16:24 2018

@author: Zcy
"""
from gevent import monkey
import sifany_util
monkey.patch_all()
import json
import redis
from flask_cors import CORS
from flask import Flask,request,Response
app=Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
setting_path='setting-data.json'
setting_f=open(setting_path,'r')
setting=json.load(setting_f)
setting_f.close()
redis_conn=redis.Redis(host=setting['redis_ip'],port=setting['redis_port'])
def getRedisV(key):
    print(key)
    keys=str(key).split(',')
    print(keys)
    res={}
    for keyi in keys:
        print('ddddddddddddddddddddd')
        print(keyi)
        print(redis_conn.hget('sifany_obj_data',keyi))
        res[keyi]=redis_conn.hget('sifany_obj_data',keyi).decode()
    print(res)
    return res
@app.route("/getRedis",methods=["GET","POST"])
def gx_Cnn():
    return get_response(getRedisV((request.values.get("key"))))


def get_response(data):
    response = Response(
                response=json.dumps(data),
                status=200,
                mimetype='application/json'
            )
    return response
