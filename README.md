# express-s3-example

Express에서 AWS-SDK를 이용하여 s3에 이미지를 업로드하고 썸네일을 생성해주는 예제입니다.

# 방법

먼저 AWS credencials 설정을 완료후에 진행해주세요 ([AWS메뉴얼](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-nodejs.html))

```
$ npm i
$ npm run start
```

`http://127.0.0.1:3000`(로컬기준) 에서 단일 파일 혹은 다중파일을 선택하여 업로드를 진행할 수 있습니다.

원본파일은 비동기가 아닌 방식으로 진행되며, 원본파일 업로드 후 썸네일은 비동기로 이미지 파일을 생성하여 s3에 백그라운드로 등록까지 진행합니다.

사용자(Client) → 파일선택/등록(Client) → 멀티파트로 들어온 파일을 S3에 등록(Server) → 사용자에게 이미지URL과 만들어질 썸네일URL를 반환(Server) → 썸네일생성/S3 등록:비동기(Server) 