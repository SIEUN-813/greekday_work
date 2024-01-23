## 프로젝트제작 발표 인사

## 프로세스

## 제작툴 소개
- FRONTEND
    html5, css3, sass, react, javascript, redux, vue.js, jquery

- BACKEND
    php, ftp(알드라이브), node.js, java, jsp, apache tomcat, http server, apache, mysql (DB)

- REST API
    AJAX, AXIOS

- RESP API DATA
    JSON

- 형상관리
    깃허브, GIT BASH

- ftp & 리눅스SSH
    FTP

- IDE(개발자프로그램)
    VISUAL STUDIO CODE, ECLIPSE IDEA

## 리액트 프레임워크 전체 구조
- package.json     
	"dependencies" 리액트 개발에 사용한 의존성 프로그램
    * "@reduxjs/toolkit": "^1.9.7",         : 리덕스 코어 & 툴킷
    * "axios": "^1.5.0",                    : REST API
    * "react": "^18.2.0",                   : 리액트
    * "react-daum-postcode": "^3.1.3",      : 카카오 주소검색 API
    * "react-dom": "^18.2.0",               : 리액트 돔
    * "react-redux": "^8.1.3",              : 리액트 리덕스
    * "react-router-dom": "^6.17.0",        : 리액트 라우터 돔
    * "sass": "^1.66.1"                     : 리액트 사스 
    * "json": "^11.0.0",                    
    * "swiper": "^11.0.5",                  : Swiper JS
    * "web-vitals": "^2.1.4",               

- 정적파일(public) 
    * css
    * data (intro | sub)                    : json 파일 (모델 데이터)
    * fonts                                 
    * images
    * js
    * css
    * scss
    * index.html

- 동적파일(src)
    * reducer                               : 최상위 상태관리 리덕스 구현 (애플리케이션의 상태와 로직을 생성)
        * addressAPIModal.js                : 주소모달 상태관리
        * cartProduct.js                    : 장바구니 상태관리
        * confirmModal.js                   : 컨펌모달 상태관리
        * isAddressAPIModal.js              : 주소검색 상태관리
        * mainModal.js                      : 메인모달 상태관리
        * recentlyViewProduct.js            : 최근본상품 상태관리
        * signIn.js                         : 로그인정보 상태관리
        * viewProduct.js                    : 상세페이지 상태관리
        * viewProductIsFlag.js              : 상세페이지 상태관리

    * wrap                                  : 전체 컨포넌트 폴더
        * main                              : INTRO & MAIN
        * scss                              : 리액트 사스
        * sub                               : SUB

    * index.js

    * WrapComponent.jsx

## 포트폴리오 웹사이트 전체 구조
- INTRO
- SUB (Product & Brand Story & Event & Review & Life & Partner & 정기배송)
- 상품상세페이지
- 장바구니
- 회원 & 관리자 회원가입
- 회원 & 관리자 로그인
- 회원 & 관리자 마이페이지
- 자주묻는질문
- 공지사항

## INTRO
- 메인모달
    * MainModalComponent.jsx
        - 상점 행사 이미지 띄우고, 닫기 버튼 클릭 시 하루동안 열리지 않음 (만료기한설정)
        - 브라우저 저장소 (로컬스토레이지 'GREEKDAY_MAIN_MODAL')

- 탑모달
    * TopModalComponent.jsx

- 헤더영역
    * HeaderComponent.jsx
    좌측 : 로고 클릭 시 홈으로 이동하는 라우터 구현
    중앙 : 서브페이지로 이동하는 라우터 구현
    우측 : 로그인 전 => 회원가입 & 로그인 & 장바구니로 이동하는 라우터 구현
           로그인 후 => 마이페이지 & 장바구니로 이동하는 라우터 구현

- 메인
    * mainComponent.jsx

- 푸터영역
    * FooterComponent.jsx
        Event                   : SUB3
        Review                  : SUB4
        Membership
        FAQ                     : SUB12
        Notice                  : SUB11

- 고탑버튼
    * GoTopComponent.jsx
        - 우측 하단에 goTop 버튼 배치선택한 수량 전달
        - goTop 버튼 클릭 시 페이지 최상단으로 자동 스크롤

- 모달창
    * ConfirmModalComponent.jsx
        - 모달창 뜨면 화면 스크롤 불가

- 주소검색창
    * PostcodeComponent.jsx
        - 주소 검색 & 지번주소 검색 => 주소 + 우편번호 저장
        - 브라우저 저장소 (로컬스토레이지 'GREEKDAY_ADDRESS_INFORMATION')

- 상세페이지
    * ProductViewComponent.jsx
        - 상태관리 리덕스 (viewProduct.js)로 관리
        - 상품정보(이미지, 제품명, 제품설명, 정가, 할인율) => selector.viewProduct.current 가져오기
        - 장바구니 버튼 클릭 시 selector.viewProduct.current & 제품코드 & 선택한 수량 전달
        - 최근본상품 상세내용이 페이지에 보이게 구현 => 바인딩
        - 상품 수량 선택 조건부 연산자 => 상품의 수량 카운트(state.cnt) = state => cnt=1 => cnt : state.cnt+1
        - 상품판매가 = Math.round(정가 * (1 - 할인율)) => hap
        - 총상품금액(state.totalPay) = 상품 수량(state.cnt) * 상품 가격(Number(selector.viewProduct.current.판매가))
        - 상품 수량 카운트 바구니에 넣기 전 최종 수량과 금액 계산
        - 상품 수량을 선택하여 장바구니에 넣기    
        - 장바구니 버튼 클릭 이벤트
        - 기존 장바구니 내용에 속성 추가
        - 장바구니 목록 로컬스토레이지 저장소에서 가져오기
        - 동일한 상품은 이전의 상품목록에 현재 상품이 있는지 비교하고 결과를 trun & false 로 반환
            => 동일한 상품이 있는 경우 => 장바구니 수량에 입력한 수량만 추가
            => 동일한 상품이 없는 경우 => 장바구니에 추가
        - 브라우저 저장소 (로컬스토레이지 'GREEKDAY_CART_PRODUCT')
        - 새로고침해도 'INNISFREE_VIEWPRODUCT' 로컬스토레이지에서 데이터 가져와서 보이게 구현 
            => React.useEffect() 사용
            - state.cnt (상품수량) 값이 들어오면 총상품금액 저장
            - 브라우저 저장소 (로컬스토레이지 'GREEKDAY_CART_PRODUCT')에 저장된 데이터가 있으면 해당 데이터를 가져와서 리덕스에 전달

- 장바구니
    * CartComponent.jsx
        - 장바구니가 비어 있으면 '장바구니가 비어 있습니다.'
        - 장바구니에 상품이 있으면 상품이미지 & 상품명 & 상품가격 & 수량 | 총 상품금액 & 상품 할인 & 배송비 & 결제예정금액
            - 상품 앞에 체크박스 선택 후 선택삭제 버튼 클릭 시 장바구니에서 상품이 삭제되면서 총 상품금액 & 상품 할인 & 배송비 & 결제예정금액 가격에 반영
            - 장바구니에 있는 상품의 수량을 추가할 시 수량 & 총 상품금액 & 상품 할인 & 배송비 & 결제예정금액 가격에 반영
            - 장바구니에 있는 상품이미지 & 상품명 클릭 시 선택한 상품의 상세페이지로 이동
        - 장바구니 데이터베이스
            - cartProduct.js 리덕스스토어 안에 cartMethod에 저장
                - 로그인 하기 전 장바구니 목록 있는 경우, 로그인하면 기존 장바구니 목록을 해당 아이디 장바구니 데이터베이스에 목록 추가
                        1. 이전에 동일한 상품이 있는 경우에 로그인 전 상품을 담아두면, 로그인 후에 해당 상품 수량만 증가
                        2. 이전에 동일하지않은 상품이 있는 경우에 로그인 전 상품을 담아두면, 로그인 후 해당 상품 추가
                - 로그인 한 상태로 구현 , 장바구니에 데이터가 있다고 간주한 상태로 시작 
                    => 로그인 한 상태는 모든 장바구니가 데이터베이스에 저장 관리 & 로그인하면 어디든지 장소에 관계없이 장바구니 CRUD 구현 가능
                        1. 임시 상태변수 cart, setCart
                        2. cart에 리덕스 스토어에 있는 장바구니 목록 모두 가져와서 저장
                        3. cart에 있는 장바구니 목록을 모두(map함수 사용) 데이터베이스에 저장 => 한 번에 하나의 목록만 데이터베이스에 저장
                        4. 저장완료 후 새로고침 시 한 번 더 저장이 됨 => cart 상태변수에 장바구니 목록을 모두 삭제
                        5. 데이터베이스에 장바구니를 저장한걸 표시 => cartDBSave ok! => 로컬저장소에 저장
                        6. 조건문 cartDBSave ok 문자가 있다면 저장 더이상 안 함
                - 데이터베이스 장바구니에 중복아닌 상품 저장 시 insert문으로 저장 & 추가
                        1. 사용자아이디, 제품코드 => 중복체크 => SELECT문
                        2. 데이터가 존재한다면 중복됨
                        3. if()문 사용
                - 데이터 저장 완료 후 select문으로 데이터베이스 장바구니 데이터목록 가져오기
                - 데이터베이스 장바구니에 중복된 상품 저장 시 update문으로 수량만 증가
                        1. 조건1 : DB 연동 => 로그인 되었다면 연동
                        2. 조건2 : 상품수량 데이터베이스에 넘겨주기 => php => mysql(UPDATE 사용자아이디, 제품코드 기준으로 수정, 수량=$수량) => DB 저장 => 응답
                        3. 해당 제품코드의 사용자아이디, 제품코드, 수량 추출
                        4. REST API => 매개변수 (사용자아이디, 제품코드, 수량) 전달
                        5. UPDATE 함수 생성
                - 개별체크 & 선택체크 삭제는 delete문으로 데이터베이스 장바구니 데이터목록 삭제
                        1. 선택된 상품 (chk) map함수 사용해서 반복문으로 저장된 장바구니 삭제
            [DB]
            + greekday_create_cart_table.php
            + greekday_cart_table_insert.php
            + greekday_cart_table_select.php
            + greekday_cart_table_update.php
            + greekday_cart_table.delete.php
            + greekday_cart_table.sql

## MAIN
- 메인페이지 구성
    * Section1Component.jsx
    * Section2Component.jsx
        - json 파일 가져오기
            => React.useEffect() 사용 | axios 사용
    * Section2ComponentChild.jsx
        - 새로고침해도 'GREEKDAY_VIEW_PRODUCT' 로컬스토레이지에서 데이터 가져와서 보이게 구현 
            => React.useEffect() 사용
        - 탭메뉴에 따라 상품목록 다르게 보이게 구현 => 반복문 map 함수 사용
    * Section3Component.jsx
    * Section4Component.jsx
    * Section5Component.jsx
    * Section6Component.jsx
        - json 파일 가져오기
            => React.useEffect() 사용 | axios 사용

## SUB
- 서브페이지 Product & Brand Story & Event & Review & Life & Partner & 정기배송 구성
    * Sub1Component.jsx (Product)
        * Sub1ComponentChild.jsx
            - 상품 리스트 컴포넌트, MVC패턴, 반응형 즉시 데이터 번경
            - 전체 & 요거트 & 토핑 & 베이커리 & 세트 & 굿즈 & 정기배송 탭메뉴 구성
    * Sub2Component.jsx (Brand Story)
    * Sub3Component.jsx (Event)
    * Sub4Component.jsx (Review)
    * Sub5Component.jsx (Life)
    * Sub6Component.jsx (Partner)
    * Sub7Component.jsx (정기배송)

## 일반회원관리
- 회원가입
    * Sub8SignUpMobileCheckComponent.jsx
        <step1. 회원가입 인증>
        - 개인회원
        1. 휴대폰인증하기 버튼 클릭시 => 이름 휴대전화 생년월일 입력하는 Sub8SignUpCompleteComponent.jsx 화면으로 이동
        2. 이름 휴대전화 생년월일 입력    
        3. <step2. 기본정보 입력> 에 이름 휴대전화 생년월일 자동으로 입력 & 본인인증이 완료되었습니다.
            [DB]
            + greekday_member_create_table.php
            + greekday_mobile_check_insert.php

            - 이름 휴대폰번호 생년월일 필수 입력 => 미입력시 (이름 휴대폰번호 생년월일) 입력해주세요
            - 휴대폰번호 중복 확인 		   => 중복시 사용 불가능한 휴대폰번호 입니다
            [DB]
            + greekday_mobile_duplicate_check.php

            - 아이디 & 이메일 입력 시 중복 확인
            + greekday_id_duplicate_check.php
            + greekday_email_duplicate_check.php
        - 사업자회원
        - 외국인회원

    * Sub8SignUpComponent.jsx
        <step2. 기본정보 입력>
        이름
        - 이름 필수 입력 => 미입력시 이름을 입력해주세요

        아이디
        - 공백허용안함 : 아이디를 입력해 주세요
        - 입력값 : 아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.
        - 대문자/공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다.
        - (사용가능한 입력한 아이디)는 사용 가능한 아이디입니다.
            - 아이디 필수 입력 => 미입력시 아이디를 입력해주세요
            - 아이디 중복 확인 => 중복시 (사용중인 아이디)는 이미 사용중인 아이디입니다.

        비밀번호
        - 최대 16자리
            - 비밀번호 필수 입력 => 미입력시 비밀번호를 입력해주세요

        비밀번호확인
        - 비밀번호가 일치하지 않습니다.
            - 비밀번호확인 필수 입력 => 미입력시 비밀번호를 한 번 더 입력해주세요

        일반전화
        - select
        - input
        - input
            - 일반전화 필수 입력 => 미입력시 유효한 전화번호를 입력해주세요

        휴대전화
        - select
        - input
        - input

        이메일
        - 유효한 이메일을 입력해 주세요.
        - 사용 가능한 이메일입니다.
            - 이메일 필수 입력 => 미입력시 이메일을 입력해주세요
            - 이메일 중복 확인 => 중복시 이미 사용중인 이메일입니다. 다른 이메일로 다시 시도해 주세요.

        성별
        - 남자
        - 여자

        생년월일
        - 기본 '양력'

        평생회원
        - 기본 '동의안함'

        이용약관동의
        - '모두 동의합니다' 클릭 시 모든 체크박스(4) 체크
            <=> 해제시 모든 체크박스(4) 체크 해제
        - 이용약관 동의 & 개인정보 수집 및 이용 동의 & 쇼핑정보 수신 동의 클릭 시 모든 체크박스(4) 체크
            <=> 하나라도 체크 해제시 '모두 동의합니다' 체크 해제
        - 이용약관동의 체크 확인 => [필수]미체크시 필수 이용약관동의에 체크해주세요
        [DB]
        + greekday_signup_insert.php
        + greekday_member_table.sql

    * Sub8SignUpCompleteComponent.jsx
        - 회원가입 완료 시 아이디 이름 이메일 데이터 가져와서 회원가입정보 보임

- 로그인
    * Sub9SignInComponent.jsx
    [DB]
    + greekday_signIn.php

- 아이디 찾기
    * Sub9SignInIdSearchComponent.jsx
    * Sub9IdSearchResultComponent.jsx
    [DB]
    + greekday_id_search_name_email_select.php

- 비밀번호 찾기 & 비밀번호 재설정
    * Sub9SignInPwResetComponent.jsx
    * Sub9SignInPwSearchComponent.jsx
    [DB]
    + greekday_pw_reset.php
    + greekday_pw_search_name_id_email_select.php

- 마이페이지 (최근본상품 & 배송지관리 & 회원정보수정 & 회원탈퇴 & 로그아웃)
    : localStorge 가입된 회원정보 (아이디, 이름, 일반전화, 휴대폰번호, 이메일) 'GREEKDAY_SIGNIN_INFORMATION' 저장
    * Sub10MyPageComponent.jsx      
        - selector에 저장된 로그인정보 삭제
        - 브라우저 저장소 (로컬스토레이지)에 저장된 로그인정보 & 주소 정보 & 최근본상품 & 장바구니 삭제
        - 첫 화면으로 이동
        [DB]
        + greekday_memberInfo_update.php
        + greekday_member_unregister.php

    * Sub10ChildViewProductComponent.jsx
        - 상품 미클릭 시 '최근본 상품 내역이 없습니다.'
        - 상품 클릭 시 브라우저 저장소 (로컬스토레이지 'GREEKDAY_VIEW_PRODUCT')
        - 상품 클릭 시 상품정보 (이미지, 할인율, 정가, 판매가) 데이터 저장
        - INTRO & 서브(Product) 페이지에서 상품을 클릭하면 최근본상품에 저장
        - 리덕스 스토어 (recentlyViewProduct.js)

    * Sub10ChildMemberUpdate.jsx    
        - 아이디 & 이메일 & 이름 & 휴대전화 & 성별 & 생년월일 데이터 자동으로 바인딩
        - 비밀번호 & 비밀번호확인 항목 입력은 필수
        - 새 비밀번호 입력 시 저장

    * Sub10ChildAddress.jsx    
    * PostcodeComponent.jsx => 주소 & 지번주소 
        - 배송지 미입력 시 => '등록된 주소가 없습니다.' 
        - 배송지 입력 시
            - 받는분은 저장된 데이터에서 가져오기
            - userAddress NULL => userAddress 입력한 주소
            - 삭제버튼 클릭 시 => 저장된 주소 삭제    
        [DB]
        + greekday_address_insert.php

## 관리자회원관리
- 관리자 회원가입
    * Sub8AdminSignUpMobileCheckComponent.jsx
        <step1. 회원가입 인증>
        - 개인회원
        1. 휴대폰인증하기 버튼 클릭시 => 이름 휴대전화 생년월일 입력하는 Sub8SignUpCompleteComponent.jsx 화면으로 이동
        2. 이름 휴대전화 생년월일 입력    
        3. <step2. 기본정보 입력> 에 이름 휴대전화 생년월일 자동으로 입력 & 본인인증이 완료되었습니다.
            - 휴대폰인증을 통해 입력한 이름 & 휴대전화 & 생년월일 데이터 가져오기
            [DB]
            + greekday_admin_create_table.php
            + greekday_mobile_check_insert.php

            - 이름 휴대폰번호 생년월일 필수 입력 => 미입력시 (이름 휴대폰번호 생년월일) 입력해주세요
            - 휴대폰번호 중복 확인 		   => 중복시 사용 불가능한 휴대폰번호 입니다
            [DB]
            + greekday_mobile_duplicate_check.php

            - 아이디 & 이메일 입력 시 중복 확인
            [DB]
            + greekday_admin_id_duplicate_check.php
            + greekday_admin_email_duplicate_check.php
        - 사업자회원
        - 외국인회원

    * Sub8AdminSignUpComponent.jsx
        <step2. 기본정보 입력>
        이름
        - 이름 필수 입력 => 미입력시 이름을 입력해주세요

        아이디
        - 공백허용안함 : 아이디를 입력해 주세요
        - 입력값 : 아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.
        - 대문자/공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다.
        - (사용가능한 입력한 아이디)는 사용 가능한 아이디입니다.
            - 아이디 필수 입력 => 미입력시 아이디를 입력해주세요
            - 아이디 중복 확인 => 중복시 (사용중인 아이디)는 이미 사용중인 아이디입니다.

        비밀번호
        - 최대 16자리
            - 비밀번호 필수 입력 => 미입력시 비밀번호를 입력해주세요

        비밀번호확인
        - 비밀번호가 일치하지 않습니다.
            - 비밀번호확인 필수 입력 => 미입력시 비밀번호를 한 번 더 입력해주세요

        일반전화
        - select
        - input
        - input
            - 일반전화 필수 입력 => 미입력시 유효한 전화번호를 입력해주세요

        휴대전화
        - select
        - input
        - input

        이메일
        - 유효한 이메일을 입력해 주세요.
        - 사용 가능한 이메일입니다.
            - 이메일 필수 입력 => 미입력시 이메일을 입력해주세요
            - 이메일 중복 확인 => 중복시 이미 사용중인 이메일입니다. 다른 이메일로 다시 시도해 주세요.

        성별
        - 남자
        - 여자

        생년월일
        - 기본 '양력'
        [DB]
        + greekday_admin_signup_insert.php
        + greekday_admin_table.sql

- 관리자 로그인
    * Sub9AdminSignInComponent.jsx
    [DB]
    + greekday_admin_signIn.php

- 관리자 아이디 찾기
    * Sub9AdminIdSearchResultComponent.jsx

- 관리자 비밀번호 찾기 & 비밀번호 재설정
    * Sub9AdminSignInPwResetComponent.jsx
    * Sub9AdminSignInPwSearchComponent.jsx
    [DB]
    + greekday_admin_pw_reset.php
    + greekday_admin_pw_search_name_id_email_select.php
    + greekday_admin_id_search_name_email_select.php

- 관리자 마이페이지 (관리자정보수정 & 회원관리 & 로그아웃)
    * Sub10AdminPageComponent.jsx
        - selector에 저장된 로그인정보 삭제
        - 로컬스토레이지에 저장된 로그인정보 & 주소 정보 삭제
        - 첫 화면으로 이동
        [DB]
        + greekday_adminInfo_update.php

    * Sub10ChildAdminUpdate.jsx    
        - 아이디 & 이메일 & 이름 & 휴대전화 & 성별 & 생년월일 데이터 자동으로 바인딩
        - 비밀번호 & 비밀번호확인 항목 입력은 필수
        - 새 비밀번호 입력 시 저장 

    * Sub10ChildMemberManageComponent.jsx    
        - 회원테이블에서 회원정보 아이디 & 비밀번호 & 이름 & 휴대폰 & 이메일 & 주소 & 생년월일 데이터 가져와서 전체보기
        - 회원정보 옆 수정 버튼 클릭 시 회원정보수정 페이지로 이동
        [DB]
        + greekday_admin_memberInfo.php

        * Sub10ChildMemberUpdateComponent.jsx
            - 관리자가 회원정보 수정 & 삭제하는 페이지
            
            아이디
            - 아이디는 수정할 수 없습니다.

            비밀번호
            - 수정가능

            이름
            - 수정가능

            휴대폰번호
            - 휴대폰번호는 수정할 수 없습니다.

            이메일
            - 수정할 이메일 입력 후 중복확인 => 수정완료

            주소

            생년월일
            - 수정할 생년월일 입력 => 수정완료

            - 수정 버튼 클릭 시 회원정보 업데이트
            [DB]
            + greekday_admin_memberInfo_modify.php

            - 삭제 버튼 클릭 시 회원정보 삭제
            [DB]
            + greekday_admin_memberInfo_delete.php

## 관리자게시판관리
- 공지사항
    * Sub11NoticeComponent.jsx              
    * Sub11NoticeInsertComponent.jsx        : 공지사항 글쓰기
    * Sub11NoticeUpdateComponent.jsx        : 공지사항 글수정
    * Sub11NoticeViewComponent.jsx          : 공지사항 글보기(글목록) & 공지사항 글삭제
        - 배열객체로 선언
        - HTML 특수문자 str_replace() 함수를 사용해서 특수문자를 엔티티코드로 변환
            - ' => &apos; 
            - " => &quot;
            - < => &lt;
            - > => &gt;
            - r & n (줄바꿈) => new line => <br />
            - 공백 => &nbsp;
        - 글목록(SELECT)에서 해당글 클릭하면 글정보가 글보기(VIEW) 컴포넌트 페이지에 보여짐
            => 글목록에서 useNavigate() 를 이용해서 글정보를 state 객체를 이용해서 전송  
        - 글수정(UPDATE)에서 폼 입력상자 수정내용 모두 입력하고 등록버튼 클릭시 서버로 REST API 이용해서 전송
        - 글삭제 해당 idx 번호를 통해서 삭제 버튼 클릭시 서버로 REST API 이용해서 전송

    [DB]
    + greekday_notice_table_update.php
    + greekday_notice_table_delete.php
    + greekday_notice_table_select.php
    + greekday_notice_table.php
    + greekday_notice_table_insert.php
        - JSON 형식의 객체로 생성해서 내보내기 (유니코드 사용 안 함)
    
- 자주묻는질문
    * Sub12FAQComponent.jsx                   
    * Sub12FAQInsertComponent.jsx           : 자주묻는질문 글쓰기
    [DB]
    + greekday_faq_table.php
    + greekday_faq_table_insert.php
    + greekday_faq_table_select.php

## 데이터베이스
- greekday_member_table                     : 회원 목록 테이블
- greekday_admin_table                      : 관리자 목록 테이블
- greekday_notice_table                     : 공지사항 목록 테이블
- greekday_faq_table                        : 자주묻는질문 목록 테이블
- greekday_mobile_check_table               : 회원 & 관리자 휴대폰인증 테이블

## 배포 아키텍쳐
    - 깃허브                   => https 프로토콜(SSL인증서), 리눅스 운영체제, git pages
    - 네트리파이               => https 프로토콜(SSL인증서), node.js 계열 호스팅, 정적 사이트 제공
    - 닷홈                     => http 프로토콜, 리눅스 운영체제, 아파치 웹서버, PHP, MYSQL

## 수정 및 보완
    - 최근본상품 (삭제 & 담기) 버튼 클릭 시 동작
    - 로그인 시 저장된 배송지정보 자동 바인딩
    - 관리자 회원정보수정(주소) 업데이트 반영
    - 자주묻는질문 목록 클릭 시 해당 글 내용만 보이게 수정

## 유지보수
    - 향후 데이터 업데이트