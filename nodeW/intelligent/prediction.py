import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import LSTM,Dropout,Dense
from numpy import concatenate
from sklearn.metrics import mean_squared_error,mean_absolute_error,r2_score
from math import sqrt
#2021.2.8
#读取2019年茅台的数据，按4：1划分训练集（train）测试集（test），train是195*5的dataframe,test是49*5的dataframe，
# ndarray_train(195*5)是train的ndarray形式，x_train（190*5*4）是训练集的特征值,y_train（）是训练集的标签，
#算法为y_train[0]=(day5.close-day1.open)-1
# 数据预处理
look_back=5
names=['date','opening price','highest price','lowest price','closing price']
df=pd.read_csv('600519 2019.csv',encoding='gbk',header=None)
df=df.iloc[:,:5]
df.columns=['date','opening price','highest price','lowest price','closing price']
#col=列数
col= len(df.columns)-1
def split(dataframe,ratio):#划分训练集测试集函数，ratio表示划分比例
    length=len(dataframe)
    fenjiexian = int(length * ratio)
    train=df[:fenjiexian][names]
    test = df[fenjiexian:][names]
    return train,test
def getprofit(ndarray1,ndarray2,lookback):#计算收益率函数，ndarray1是输入数据，ndarray2是输出收益率，lookback是回测天数
    for i in range(len(ndarray1)-lookback):
        ndarray2[i]=(ndarray1[i+5][3]/ndarray1[i+1][0])-1
    return ndarray2
def dimension2to3(ndarray1,ndarray2,lookback):#将二维的ndarray1转换成三维的ndarray2
    for i in range(len(ndarray1) - lookback):
        for j in range(lookback):
            for c in range(col):
                ndarray2[i][j][c] = ndarray1[i + j + 1][c]
    return ndarray2
train,test=split(df,0.8)
#print('------------------------------------------------------------------------')
ndarray_train=np.empty((len(train),4))
#将df转换成ndarray
#print('----------------------------------------------------------')
#先转换成195，4的ndarray
for a1,a2 in train.iterrows():
    for i in range(len(train.columns)-1):
        ndarray_train[a1][i]=a2[i+1]
#ndarray_train是从2019.1.02到2019.10.23的所有开高低收的集合，shape为(195,4)
#用来训练的集合要在ndarray_train的基础上删减，五个一组，从2019.1.03-2019.1.09、
# 2019.1.04-2019.1.010.。。。。。2019.10.17-2019.10.23，一共190，5，4组数据
x_train=np.empty((len(ndarray_train)-look_back,5,4))#x_train为190,5,4的数组

x_train=dimension2to3(ndarray_train,x_train,look_back)
print(x_train)
# print(x_train.shape)#至此x_train已经变成了训练集
#2021.2.15------------------------------------------------------------------------------
#建立y_train(190*1)
y_train=np.empty((len(ndarray_train)-look_back,1))#190*1
y_train=getprofit(ndarray_train,y_train,look_back)
#2021.2.19
ndarray_test=np.empty((len(test),4))
#将df转换成ndarray

for a1,a2 in test.iterrows():
    for i in range(len(test.columns)-1):
        ndarray_test[a1-len(train)][i]=a2[i+1]
x_test=np.empty((len(ndarray_test)-look_back,5,4))
x_test=dimension2to3(ndarray_test,x_test,look_back)
y_test=np.empty((len(ndarray_test)-look_back,1))
y_test=getprofit(ndarray_test,y_test,look_back)
#搭建模型
scaler=MinMaxScaler()
for i in range(x_train.shape[0]):
    x_train[i]=scaler.fit_transform(x_train[i])
for i in range(x_test.shape[0]):
    x_test[i]=scaler.fit_transform(x_test[i])
model=Sequential()
model.add(LSTM(64,input_shape=(x_train.shape[1],x_train.shape[2])))
model.add(Dropout(0.5))
model.add(Dense(1,activation='linear'))
model.compile(loss='mae',optimizer='adam')
loss_graph=model.fit(x_train,y_train,epochs=50,batch_size=50,validation_data=(x_test, y_test), verbose=2,shuffle=False)
plt.plot(loss_graph.history['loss'], label='train')
plt.plot(loss_graph.history['val_loss'], label='predict')
plt.title('maotai 2019', fontsize='12')
plt.ylabel('loss', fontsize='10')
plt.xlabel('epoch', fontsize='10')
plt.legend()
plt.show()
y_test_predict=model.predict(x_test)
plt.plot(y_test,color='red',label='real')
plt.plot(y_test_predict,color='blue',label='predict')
plt.xlabel('days')
plt.ylabel('shouyilv')
plt.title('maotai2019')
plt.legend()
plt.show()

#回归评价指标
# calculate MSE 均方误差
mse=mean_squared_error(y_test,y_test_predict)
# calculate RMSE 均方根误差
rmse = sqrt(mean_squared_error(y_test, y_test_predict))
#calculate MAE 平均绝对误差
mae=mean_absolute_error(y_test,y_test_predict)
#calculate R square
r_square=r2_score(y_test,y_test_predict)
# print('均方误差: %.6f' % mse)
# print('均方根误差: %.6f' % rmse)
# print('平均绝对误差: %.6f' % mae)
# print('R_square: %.6f' % r_square)
def reshape(ndarray1,ndarray2):#ndarray2的shape变得和ndarray1一样，剩余部分用0填充
    for i in range(len(ndarray1)-len(ndarray2)):
        ndarray2=np.append(ndarray2,0)
    ndarray2=ndarray2.reshape(len(ndarray2),1)
    return ndarray2
col1=test['date'].values#ndarray
col1=col1.reshape(len(col1),1)
col2=y_test
col3=y_test_predict
col4=col2-col3

col2=reshape(col1,col2)
col3=reshape(col1,col3)
col4=reshape(col1,col4)
result=np.hstack((col1,col2,col3,col4))
result=pd.DataFrame(result,columns=['date','real','predict','deviation'])
# print(result)
result.to_csv('预测结果.csv',index=False)