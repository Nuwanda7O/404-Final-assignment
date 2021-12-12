import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from tensorflow.keras.callbacks import TensorBoard
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Activation,LSTM,Dropout,Dense,BatchNormalization,LeakyReLU
from tensorflow.keras.optimizers import SGD
from numpy import concatenate
from sklearn.metrics import mean_squared_error,mean_absolute_error,r2_score
from math import sqrt
LR = 0.0006
look_back=5
ratio=0.8
scaler=MinMaxScaler(feature_range=(0,1))
df = pd.DataFrame(columns=['date', 'open', '5days-open'])
file='data'
for root, dirs, files in os.walk(file):
    for f in files:
        code = str(f).split('.')[0]
        path = './data/' + str(f)
        temp_df = pd.read_csv(path, encoding='gbk', usecols=[0,1, 2])
        #dropna()
        temp_df.columns = ['date', 'open', '5days-open']
        df=df.append(temp_df)

high=len(df)-look_back+1
y = np.empty((high, 1), dtype='float32')
x = np.empty((high,look_back), dtype='float32')
a=-1
for i in range(high):
    a=a+1
    y[a]=df['5days-open'].iat[i]
    x[a][0] = df['open'].iat[i]
    x[a][1] = df['open'].iat[i+1]
    x[a][2] = df['open'].iat[i+2]
    x[a][3] = df['open'].iat[i+3]
    x[a][4] = df['open'].iat[i+4]
x=scaler.fit_transform(x)
# print(y.shape)
# print(x.shape)
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.2)
x_train=np.reshape(x_train,(x_train.shape[0],x_train.shape[1],1))
print(x_train.shape)
x_test=np.reshape(x_test,(x_test.shape[0],x_test.shape[1],1))
model = Sequential()
model.add(LSTM(2,input_shape=(None,1)))
model.add(Dense(1))
model.compile(loss='mse', optimizer='Adam')
model.summary()
history=model.fit(x_train,y_train,epochs=40,batch_size=5,
                  verbose=2)
plt.plot(history.history['loss'], label='train')
plt.plot(history.history['val_loss'], label='predict')
plt.title('2019', fontsize='12')
plt.ylabel('loss', fontsize='10')
plt.xlabel('epoch', fontsize='10')
plt.legend()
plt.show()
# model.add(LSTM( input_shape=(x_train.shape[1],x_train.shape[2]),
#                units=50, return_sequences=True))
# model.add(LSTM(input_dim=50, units=100, return_sequences=False))
# model.add(Dense(input_dim=100, units=1))
# model.add(BatchNormalization())
# model.add(Dropout(0.2))
# model.add(LeakyReLU(alpha=0.02))
# model.compile(loss='mse',
#               optimizer=SGD(lr=LR, decay=1e-6, momentum=0.9, nesterov=True))
# history=model.fit(x_train,y_train,epochs=40,batch_size=120,validation_data=(x_test, y_test), verbose=2,shuffle=False,callbacks=[TensorBoard(log_dir='MyBoard',histogram_freq=0)])
#
# plt.plot(history.history['loss'], label='train')
# plt.plot(history.history['val_loss'], label='predict')
# plt.title('2019', fontsize='12')
# plt.ylabel('loss', fontsize='10')
# plt.xlabel('epoch', fontsize='10')
# plt.legend()
# plt.show()
# x_test=np.reshape(x_test,(x_test.shape[0],5))
# y_test_predict=model.predict(x_test)
#
# print(history.history['loss'])
# plt.plot(y_test,color='red',label='real')
# plt.plot(y_test_predict,color='blue',label='predict')
# plt.xlabel('days')
# plt.ylabel('earning_rate')
# plt.title('2019')
# plt.legend()
# plt.show()
# # y_test_predict.shape 952*1 ndarray
# # 回归评价指标
# # calculate MSE 均方误差
# mse=mean_squared_error(y_test,y_test_predict)
# # calculate RMSE 均方根误差
# rmse = sqrt(mean_squared_error(y_test, y_test_predict))
# #calculate MAE 平均绝对误差
# mae=mean_absolute_error(y_test,y_test_predict)
# #calculate R square
# r_square=r2_score(y_test,y_test_predict)
# print('均方误差: %.6f' % mse)
# print('均方根误差: %.6f' % rmse)
# print('平均绝对误差: %.6f' % mae)
# print('R_square: %.6f' % r_square)
#
#
#
#
#
