# -*- coding: utf-8 -*-
"""
Created on Mon Nov 19 16:16:24 2018

@author: Zcy
"""
import gx_pyservice_base
from gevent import pywsgi



server = pywsgi.WSGIServer(('172.17.0.2', 5005), gx_pyservice_base.app)
server.serve_forever()