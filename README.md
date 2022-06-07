# CG tutorial

2022-1 컴퓨터 그래픽스 기말과제

201720810 박해인

LightShadow tutorial
----------------------------------------------------------------

이번 과제의 주제는 three.js에 존재하는 LightShadow에 대한 tutorial입니다.

Graphics란 도학, 즉 그림에 관련된 항목이며 그림이란 시각적인 정보를 담고있는 data의 일종이라고 할 수 있습니다.

또한 우리가 어떤 object를 시각적으로 보기 위해서는 무조건 Light가 필요하며, Light가 있다면 그에 따른 Shadow가 무조건 생기게 됩니다.

따라서 Light와 Shadow가 Graphics를 나타낼 때 가장 기초적인 전제 조건이라고 판단하였으며, 이번 과제에서 간단한 예제들과 사진을 통해 다루어보고자 주제를 선정했습니다.

----------------------------------------------------------------

index.html 파일은 해당 조건들을 웹페이지를 통해 보여주는 index 파일입니다.

script.js 파일은 실제 구현될 코드가 작성된 script 파일입니다.

모듈은 three.js만 사용했습니다.

upload된 script은 Light의 위치 변화에 따라 shadow가 어떻게 변하는지 기초적인 code를 작성해두었습니다.

1. light2의 주석처리를 제거한다면 빛이 여러개 있을때 물체의 shadow가 어떻게 보이는지 확인할 수 있습니다.
2. cube의 주석처리를 제거한다면 물체가 여러개 있을때 shadow가 어떻게 나타나는지 확인할 수 있습니다.

이외의 propertys에 대해서는 아래 항목에 기술합니다.

----------------------------------------------------------------

기본적으로 전제 조건들은 다음과 같습니다 :
1. 화면의 크기는 해당 window의 width, height로 결정된다.
2. Scene은 three.js에서 제공되는 Scene이다.
3. camera는 PerspectiveCamera이며, 시야각은 45, near-far = 0.1~1000 이다.

또한, LightShadow를 표현하기 쉽게 DirectionalLight를 사용하였습니다.
(그림자는 PointLight, DirectionalLight, SpotLight만 지원합니다.)

DirectionalLight의 코드는 three.js example 사이트인 https://threejs.org/docs/index.html?q=light#api/en/lights/shadows/DirectionalLightShadow 의 예제 코드를 사용하였습니다.

shadow를 표현하기 위해선 빛을 비추는 geometry와 해당 geometry의 그림자를 표현해줄 Background가 필요합니다.

Geometry는 three.js에서 제공하는 SphereGeometry를 사용하였으며, 각진 물체가 좀 더 그림자를 파악하기 쉽다고 판단하여 segment는 width, height 각각 8로 설정했습니다.

또한 빛이 물체에 반사되는 것을 확인하기 위해 Phong Material을 사용했습니다.

Background는 three.js에서 제공하는 PlaneGeometry를 사용하였으며, 빛에 마주보는 각도로 rotate했습니다. 

Background는 굳이 빛을 반사할 필요가 없으므로 Lambert Material을 사용했습니다.

![image](https://user-images.githubusercontent.com/78847219/172360902-f23dc4bb-5797-4b33-8568-08f037e4517f.png)

화면의 구성도는 다음과 같습니다.

Light, geometry, shadow receiver (background)를 모두 확인할 수 있도록 배치했습니다.

Light는 화면상에서 확인하기 어렵기 때문에 해당 빛이 어느 지점에서 시작하여 어느 방향으로 향하는지 표시해주는 helper를 사용하였습니다.

------------------------------------------------------------------------------

# 그림자 활성화

그림자를 표현하기 위해서는 renderer의 shadowMap을 결정해야합니다. shadowMap은 그림자를 필터링하는 방법입니다.

shadowMap은 총 4가지로 구분되어 있습니다.

1. BasicShadowMap
- 필터링되지 않은 shadowMap을 제공합니다. 속도는 빠르지만 품질은 낮습니다.

![image](https://user-images.githubusercontent.com/78847219/172358087-4f283fd5-3dbc-4c46-99d5-e65f7a5483a8.png)

2. PCFShadowMap (default)
-  PCF(백분율 근접 필터링) 알고리즘을 사용하여 shadowMap을 필터링합니다.

![image](https://user-images.githubusercontent.com/78847219/172358303-8ee589d8-62b8-4c9e-a883-706e349379bf.png)

3. PCFSoftShadowMap
- PCF 알고리즘을 사용하며 더 soft한 shadowMap을 필터링합니다.

![image](https://user-images.githubusercontent.com/78847219/172358845-49bf6223-e1fc-48ec-a865-32f15fb06bd4.png)

4. VSMShadowMap
- VSM(Variance Shadow Map) 알고리즘을 사용하여 shadowMap을 필터링합니다. VSMShadowMap을 사용하면 모든 receiver가 그림자를 띄웁니다.

![image](https://user-images.githubusercontent.com/78847219/172359087-37537884-1267-465c-8540-4ce79bdc6b1d.png)

해당 예제에서는 PCFSoftShadowMap을 사용할 것입니다.

## Light ShadowMap Optimization

ShadowMap을 정했다면, 해당 light의 shadow 프로퍼티를 통해 구체적인 shadowMap의 성질을 정할 수 있습니다.

- Render size = shadow.mapSize.width / shadow.mapSize.height

default값은 512x512입니다. 해상도를 감소시키면 그림자의 품질이 낮아지고, 증가시키면 테두리가 좀 더 선명해지는 모습을 볼 수 있습니다.

![image](https://user-images.githubusercontent.com/78847219/172364260-41bc47bf-f8ba-4aaa-9955-706d17d7d37c.png)
![image](https://user-images.githubusercontent.com/78847219/172364356-46ec1c16-5104-4de3-8226-49d2b52ea5b9.png)

왼쪽은 50x50 // 오른쪽은 1024x1024 로 설정한 모습입니다.

- Near-far = shadow.camera.near / shadow.camera.far

사용자가 보는 화면을 camera를 통해 render 되듯이, Light의 shadowMap 또한 camera를 통해 rendering합니다. 

따라서 해당 camera의 near-far를 설정해주어야 합니다. 해당 값은 그림자의 품질 개선이 아니라 그림자가 갑자기 사라지는 버그를 해결해 줍니다.

default 값은 near = 0.5 / far = 500 입니다.

![image](https://user-images.githubusercontent.com/78847219/172366308-520d1f93-492b-47b4-8da6-2388c8ea9222.png)

- near-far의 간격을 지나치게 좁게 했을 경우 생기는 그림자 잘림 현상

===========================================================

shadowMap을 활성화 하였다면, Light와 geometry가 shadow를 cast할 것인지 설정해야합니다.

기본적으로 빛을 물체에 비추면 해당 Object의 뒷면(빛을 받지 못하는 부분)이 까매지며, 이를 core shadow라고 합니다. 따로 설정하지 않더라도 활성화 되어있습니다.

하지만 물체의 외부에 생기는 그림자, 즉 drop shadow는 따로 활성화를 해줘야하며 이는 castShadow 프로퍼티로 정의되어 있습니다.

![image](https://user-images.githubusercontent.com/78847219/172362543-487be44c-7381-4bfc-a873-48d86c5641e0.png)

- castShadow = false

castShadow를 다음과 같이 true로 설정하면 drop shadow를 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/78847219/172362148-f62f1269-8525-484e-bd6c-fb7b4afc126d.png)

![image](https://user-images.githubusercontent.com/78847219/172362440-2ba59072-c186-4526-971a-aa536fe2448c.png)

![image](https://user-images.githubusercontent.com/78847219/172362640-7c980ebe-fdf5-47c9-85eb-4b4794356e07.png)

===========================================================

Light와 geometry의 shadow를 cast하는데 성공했다면, 그림자를 받아줄 background를 활성화해야합니다. 이는 receiveShadow 프로퍼티로 설정합니다.

![image](https://user-images.githubusercontent.com/78847219/172363100-40d3590d-d725-4139-9d20-114764f9272c.png)

![image](https://user-images.githubusercontent.com/78847219/172363067-a4823770-f6c1-4931-8127-abb755d536e7.png)

- receiveShadow = false

background plane의 receiveShadow를 true로 변경해주면 드디어 그림자를 확인할 수 있습니다.

## LightShadow propertys

threejs example 아래에 있는 propertys에 대한 분석입니다. Light.shadow를 통해 접근할 수 있습니다.

- .bias = 그림자의 위치가 정확하지 않을때 조정하는 값입니다.

![image](https://user-images.githubusercontent.com/78847219/172372241-546361f1-0af5-4597-b965-611f532dce77.png) bias = -0.002
![image](https://user-images.githubusercontent.com/78847219/172372373-72355505-df43-4cbd-9cf1-4d102a243cea.png) bias = -0.01

특히, 물체가 지표면에 붙어있지 않은 상황에서 발생하는 인공적인 모습을 해결할 수 있습니다.

![image](https://user-images.githubusercontent.com/78847219/172372884-c20aee66-0762-4c90-8326-afdab90e1037.png)

![image](https://user-images.githubusercontent.com/78847219/172372968-f62cfca8-5f61-443e-8cc4-0c2151f8b28d.png)

(https://stackoverflow.com/questions/11118199/why-is-the-shadow-in-the-wrong-place-three-js)

default는 0이며, 매우 민감한 수치이므로 0.0001 단위의 조정을 추천한다고 합니다.

- .blurSamples = VSMShadowMap 사용시 blur처리 할때 사용하는 sample의 양을 결정합니다.

![image](https://user-images.githubusercontent.com/78847219/172376019-18f6ba2c-88bf-48f5-9311-0f737e4901d7.png)blurSamples = 1

![image](https://user-images.githubusercontent.com/78847219/172375870-ab625f88-0137-4325-ba34-3c61c524e330.png)blurSamples = 50

정수형 숫자를 인자로 받으며, 숫자가 낮을수록 geometry에 짙은 음영이 생깁니다.

- .radius = 그림자의 blur 처리를 담당하는 수치입니다.

![image](https://user-images.githubusercontent.com/78847219/172374789-9000c876-b2c8-4968-9039-65d6ba728e6c.png)
radius = 10

![image](https://user-images.githubusercontent.com/78847219/172374738-b1408cf6-fc14-46fb-9b80-bd98514b774a.png)
radius = 50

1보다 더 큰값을 사용한다면 테두리가 점점 흐려집니다. 값이 너무 높아지면 위의 경우와 같이 banding effect가 나타납니다. PCFSoftShadowMap의 경우 radius는 작동하지 않으며, mapSize의 크기를 조절함으로써 테두리의 부드러움을 조작할 수 있습니다.



## 참고 문헌 리스트
1. https://velog.io/@9rganizedchaos/Three.js-journey-%EA%B0%95%EC%9D%98%EB%85%B8%ED%8A%B8-15
2. https://threejs.org/docs/index.html?q=lights#api/en/lights/shadows/LightShadow
