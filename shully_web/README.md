설치목록
npx create-react-app Shully_web  
npm i @types/styled-components -D
npm i styled-components@6.0.7 -> 6.1.7 로 업데이트 해봄.TypeError: number 1 is not iterable (cannot read property Symbol(Symbol.iterator))
npm i styled-reset   
npm i react-router-dom@6.14.2  

npm install firebase@10.1.0

-> Firebase의 클라우드 기능(Cloud Functions)이나 HTTP 서버 설정을 수정 필요.preflight request doesn't pass access control check: It does not have HTTP ok status 에러 대처 방안

<!-- 깃 이그노어 안 될 때 깃 캐시 리부트. -->
git rm -r --cached .
git add .