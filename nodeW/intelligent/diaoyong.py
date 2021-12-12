import tensorflow
import numpy as np
from tensorflow.keras.models import load_model
import os
import pandas as pd
look_back=5
model=load_model('m1.h5')
# a=np.array(
#    [[8.79,8.84,8.63,8.75],
#    [8.75,8.87,8.71,8.86],
#    [8.78,9.05,8.75,9.01],
#    [9.14,9.14,8.97,9.03],
#    [9.08,9.08,8.96,9.01]])
# a=np.array(
#    [[568.41,570.1,554.24,558.44],
#    [555.72,576.11,550.46,570.44],
#    [576.44,580.44,570.66,573.93],
#    [573.94,580.44,568.72,573.23],
#    [578.43, 594.6, 577.48, 584.56]])
file='data'
dic={}
for root, dirs, files in os.walk(file):
    for f in files:#这个循环是读取单个csv
        code = str(f).split('.')[0]
        path = './data/' + str(f)
        
        temp_df = pd.read_csv(path, encoding='gbk', usecols=[0,1, 2, 3, 4],header=None).dropna()
        temp_df.columns = ['date', 'open', 'high', 'low', 'close']
        temp_df['code'] = code
        real_df=temp_df[len(temp_df)-look_back:len(temp_df)][['open', 'high', 'low', 'close']]
        values=real_df.values
        values=np.reshape(values,(1,values.shape[0],values.shape[1]))
        values=values.astype(float)
        earning_rate=model.predict(values)
        dic.update({code:earning_rate})

        # df=df.append(temp_df)
sorted_dic=sorted(dic.items(),key=lambda x:x[1],reverse=True)
sorted_dic=np.array(sorted_dic)
for i in range(len(sorted_dic)):
    sorted_dic[i,1]=np.reshape(sorted_dic[i,1],-1)
    sorted_dic[i,1]=str(sorted_dic[i,1])
    sorted_dic[i,1]=sorted_dic[i,1].replace('[','').replace(']','')
    print(sorted_dic[i,1])


sorted_dic[:,0]=sorted_dic[:,0].astype(int)
sorted_dic[:,1]=sorted_dic[:,1].astype(float)
print(sorted_dic)
# a=np.reshape(a,(1,a.shape[0],a.shape[1]))
# print(a.shape)
# predict=model.predict(a)
# print(predict)