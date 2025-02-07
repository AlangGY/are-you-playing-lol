# are-you-playing-lol
Riot Developers Portal에서 제공하는 API를 활용하여, 소환사명 검색을 통해 해당 소환사가 현재 실시간으로 진행하고 있는 게임 정보를 확인할 수 있는 웹 어플리케이션을 개발한다.

# 요구사항
예시 링크: OP.GG 벚 꽃 소 나#하얗고예쁨 - Live Game - League of Legends
(![image](https://github.com/user-attachments/assets/5d8c9f60-d7b6-4021-8d1f-721dc32ba0f3)


- 소환사명/태그를 통해서 검색할 수 있어야 한다.
- 실시간 게임 중이지 않을경우, 게임을 진행중이지 않다고 표시해야한다.
- 실시간 게임 중일 경우 현재 게임 정보를 표시해야한다.

**게임 정보 필수 요구사항**

- 해당 게임에서 밴된 챔피언들을 표시해야 한다.
- 각 소환사들이 팀별로 분류되어 표시되어야 한다.
- 각 소환사들의 소환사명이 표시되어야 한다.
- 각 소환사들이 선택한 챔피언이 표시되어야 한다.
- 각 소환사들이 선택한 스펠이 표시되어야 한다.

## 개발 팁

**게임 에셋(캐릭터 이미지 등) 얻는 방법:** https://developer.riotgames.com/docs/lol#data-dragon_data-assets

**riot API:** https://developer.riotgames.com/apis

1. ACCOUNT-V1
    - 특정 유저의 관련 정보를 반환한다.
2. CHAMPION-MASTERY-V4
    - 특정 유저의 챔피언 숙련도를 오름차순으로 반환한다.
3. CHAMPION-V3
    - 현재 게임에서 무료로 사용할 수 있는 챔피언과 신규 유저가 사용할 수 있는 챔피언 정보를 반환한다.
    - 신규 유저의 최대 레벨은 10으로 고정되어 있다.
4. CLASH-V1
    - LOL의 팀 토너먼트 모드인 격전과 관련된 게임 및 유저 정보를 반환한다.
5. LEAGUE-EXP-V4
    - 랭크(솔로, 자유)별 티어 및 소환사 정보를 반환한다.
6. LEAGUE-V4
    - 특정 게임/리그에 속한 유저들의 티어 정보를 반환한다.
7. LOL-STATUS-V3
    - LOL-STATUS-V4의 이전 버전 API로, 2020년 12월 11일까지 제공되었다.
8. LOL-STATUS-V4
    - 현재 플랫폼(Windows, mac, Android, iOS 등)의 정보를 반환하며, 지역별 업데이트 필요 여부를 체크한다.
9. MATCH-V4
    - 특정 게임에 대한 모든 게임 정보를 반환한다.(2021년 8월 23일까지만 제공, 이후 MATCH-V5로 확인)
10. MATCH-V5
    - 특정 게임에 대한 모든 게임 정보를 반환한다.
11. SPECTATOR-V4
    - 특정 유저가 진행 중인 게임 정보를 반환한다.
12. SUMMONER-V4
    - 특정 유저의 정보를 반환한다.
    - API 사용에 필요한 account ID, puuid 등을 확인할 수 있다.
13. THIRD-PARTY-CODE-V4
    - 특정 유저를 통해 third-party 코드를 반환한다.
14. TOURNAMENT-STUB-V4
    - 롤드컵, MSI 등의 토너먼트 관련 API로, 프로덕션 키로만 접근할 수 있다.
15. TOURNAMENT-V4롤드컵, MSI 등의 토너먼트 관련 API로, 프로덕션 키로만 접근할 수 있다.
