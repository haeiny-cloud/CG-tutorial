# CG tutorial

2022-1 컴퓨터 그래픽스 기말과제

201720810 박해인

LightShadow tutorial
----------------------------------------------------------------

이번 과제의 주제는 three.js에 존재하는 LightShadow에 대한 tutorial입니다.

기본적으로 전제 조건들은 다음과 같습니다 :
1. 화면의 크기는 해당 window의 width, height로 결정된다.
2. Scene은 three.js에서 제공되는 Scene이다.
3. camera는 PerspectiveCamera이며, 시야각은 45, near-far = 0.1~1000 이다.

또한, LightShadow를 표현하기 쉽게 DirectionalLight를 사용하였고, 해당 빛이 어느 지점에서 어느 방향으로 향하는지 표시해주는 helper를 사용하였습니다.

DirectionalLight의 코드는 three.js example 사이트인
https://threejs.org/docs/index.html?q=light#api/en/lights/shadows/DirectionalLightShadow
의 예제 코드를 사용하였습니다.

shadow를 표현하기 위해선 빛을 비추는 geometry와 해당 geometry의 그림자를 표현해줄 Background가 필요합니다.

Geometry는 three.js에서 제공하는 SphereGeometry를 사용하였으며, 각진 물체가 좀 더 그림자가 선명하다고 판단하여 segment는 width, height 각각 8로 설정했습니다.
또한 빛이 물체에 반사되는 것을 확인하기 위해 Phong Material을 사용했습니다.

Background는 three.js에서 제공하는 PlaneGeometry를 사용하였으며, 빛에 마주보는 각도로 rotate했습니다. Background는 굳이 빛을 반사할 필요가 없으므로 Lambert Material을 사용했습니다.

------------------------------------------------------------------------------

#그림자 활성화

그림자를 표현하기 위해서는 renderer의 shadowMap을 결정해야합니다.
shadowMap은 
