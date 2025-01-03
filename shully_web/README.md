설치목록_ 12/29 모듈 폴더 삭제후 재설치.
npx create-react-app Shully_web  
npm i @types/styled-components -D
npm i styled-components@6.0.7
npm i styled-reset   
npm i react-router-dom@6.14.2  

npm install firebase@10.1.0

npm install react@18.2.0 react-dom@18.2.0

Node.js v18.20.5
export NODE_OPTIONS=--openssl-legacy-provider
-> Firebase의 클라우드 기능(Cloud Functions)이나 HTTP 서버 설정을 수정 필요.preflight request doesn't pass access control check: It does not have HTTP ok status 에러 대처 방안

<!-- 깃 이그노어 안 될 때 깃 캐시 리부트. -->
git rm -r --cached .
git add .