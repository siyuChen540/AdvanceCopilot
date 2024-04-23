import base64
import os
png_list = os.listdir('./src')
for png_file in png_list:
    f=open('./src/'+png_file,'rb') #二进制方式打开图文件
    ls_f=base64.b64encode(f.read()) #读取文件内容，转换为base64编码
    f.close()
    # 保存ls_f到txt文件
    f=open('./dst/'+png_file+'.txt','wb')
    f.write(ls_f)
