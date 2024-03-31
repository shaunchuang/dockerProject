一、環境設定
先確認VM WARE有安裝DOCKER: docker container ls
如無安裝按照此步驟: https://docs.docker.com/engine/install/ubuntu/
安裝使用虛擬機套件pip3 install virtualenv
安裝DOCKER COMPOSE: https://docs.docker.com/compose/install
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
看版本: docker-compose –version
將自己的帳號加進 docker 群組
usermod -aG docker ubuntu

二、開啟FLASK
git clone https://github.com/shaunchuang/flaskProject.git()
cd flaskProject
cd flask
建立新的虛擬環境: virtualenv env(rm -rf env/)
ls -l
pip3 install virtualenv
python3 -m virtualenv env
啟動虛擬環境: source env/bin/activate
export FLASK_APP=myweb.py
export FLASK_ENV=development
執行flask，可用網頁開啟檔案flask run(還未連結SQL資料庫等)

二、開啟CONTAINER連結資料庫
安裝所需套件pip3 install -r requirements.txt (pip3 freeze > requirements.txt)
打開各個CONTAINER: docker-compose up (連結SQL資料庫等)
完成
![Uploading image.png…]()
