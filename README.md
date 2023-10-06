<img width="100%" alt="chatting" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/6acbc2ff-2441-4308-8e40-9d2648e80929.gif">

<div align="center">
  
## GUZZI ROOM
물가 상승으로 인해 소비를 절약하려 했지만 혼자서는 어려움을 겪으셨나요?<br>
"GUZZI ROOM(거지방)"은 소비 절약을 추구하는 개개인들을 위해 채팅 환경을 제공하는 서비스입니다.<br><br>

</div>

<div align="center">
  
## 프로젝트 목차

</div>

1. [프로젝트에 대하여](#프로젝트에-대하여)
2. [기술 스택](#기술-스택)
3. [설계 및 아키텍처](#설계-및-아키텍처)
4. ㄴㅇㄹ

<br><br>

## 1. 프로젝트에 대하여
### 프로젝트 설명
<blockquote>
요즘은 물가 상승과 금리 인상으로 인해 절약이 중요한 주제로 떠오르고 있습니다. <br>
그러나 현대 사회에서는 편리한 배달음식과 인터넷 쇼핑 등이 절약을 어렵게 합니다. <br>
이에 소비에만 의존하지 않고, 스스로를 가치 있게 명품으로 느낄 수 있는 방법을 찾고자 합니다.<br>
이를 위해 함께 노력하고 독려하는 채팅방을 만들어보았습니다.
</blockquote>

### 프로젝트 링크
<blockquote>
최종 배포 링크 : [GUZZI-ROOM](https://all-chat.netlify.app/) <br>
백엔드 Repo 링크 : https://github.com/mingle-mongle/guzzi
</blockquote>
<br>

## 2. 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><br>
<img src="https://img.shields.io/badge/CodeSandbox-181717?style=for-the-badge&logo=codesandbox&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><br>
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<br>

### 사용된 오픈소스
- frontend
  - mui
<br><br>

## 3. 설계 및 아키텍처


### 3-Tier 아키텍처

	<table align="center">
		<tr>
			<td align="center"><b>3-Tier Architecture</b></td>
		</tr>
		<tr>
			<td align="center">
				<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/f449399b-c070-4819-b9e6-bc8dcc4ef1cc">
			</td>
		</tr>
		<tr>
			<td align="center">
				Client : REACT </br>
        Server : Aws App Runner(Express) </br>
        Database : PlanetScale(MySQL) </br>
			</td>
		</tr>
	</table>
    <li> ᐅ GET </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 리스트 페이지별 요청</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/getPage.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				페이지 Validation check를 한 후, 올바른 요청일 경우 DB에 SELECT 쿼리를 넘깁니다. </br>
        받아온 데이터에 이상이 있을 수 있으니, 데이터도 Validation check를 해줍니다. </br>
        정확한 데이터일 경우 200 OK 응답코드와 데이터를 보내줍니다.        
			</td>
		</tr>
	</table>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 리스트 메시지 아이디별 요청</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/getMsgid.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				메세지 아이디를 Validation check를 한 후, 올바른 요청일 경우 DB에 SELECT 쿼리를 넘깁니다. </br>
        받아온 데이터에 이상이 있을 수 있으니, 데이터도 Validation check를 해줍니다. </br>
        정확한 데이터일 경우 200 OK 응답코드와 데이터를 보내줍니다.
			</td>
		</tr>
	</table>
    <li> ᐅ POST  </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 추가</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/post.png">
			</td>
		</tr>
		<tr>
			<td align="center">
			  body값에 대한 Validation check를 한 후, 올바른 요청일 경우 DB에 INSERT 쿼리를 넘깁니다. </br>
        DB에 INSERT 성공 시 201 Created 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	    <li> ᐅ PUT </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 수정</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/put.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				메세지 아이디와 body값에 대한 Validation check를 한 후, 올바른 요청일 경우 DB에 UPDATE 쿼리를 넘깁니다. </br>
        DB에 UPDATE 성공 시 204 No Content 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	    <li> ᐅ DELETE </li>
    	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 삭제</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/delete.png">
			</td>
		</tr>
		<tr>
			<td align="center">
			  메세지 아이디를 Validation check를 한 후, 올바른 요청일 경우 DB에 DELETE 쿼리를 넘깁니다. </br>
        DB에서 DELETE 성공 시 204 No Content 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	



<img width="100%" alt="archtectuer" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/32651ea2-1add-45a0-8449-5da521b56b2f">

## 💻 메인 기능
<b>FLOW</b><br>
채팅방 입장에서 텍스트, 이미지 전송까지
<div align="center">
<img width="50%" alt="haoaoao" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/9aa45737-fd69-4818-b032-f9d04845a522">
</div>

### 1. 텍스트 전송
<blockquote>
  <p dir="auto">이미지 전송 버튼이 45도 돌아가며, 비활성화 됩니다.</p>
</blockquote>
<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/59ef17c3-7641-470b-86dc-3f0a30c03c07"/>

### 2. 이미지 전송
<blockquote>
  <p dir="auto">전송할 이미지를 선택하면 미리보기가 가능하고, 텍스트 입력 창이 비활성화 됩니다.</p>
</blockquote>
<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/cc2d53d1-3f55-42af-9f2c-990b369f006e"/>


## 📂 프로젝트 관련 문서
설계 및 개발 고민 (링크 예정)
