<template>
  <div class="sport">
    <div class="map-container">
      <div class="map-inner-header">
        <div class="left">
          <div class="gps-signal">
            <svg
              t="1723199571927"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7319"
              width="16"
              height="16"
            >
              <path
                d="M512.16 192c-48 0-94.368 11.2-135.936 30.4l20.8 43.2a275.936 275.936 0 0 1 115.104-25.6 271.68 271.68 0 0 1 271.904 271.872 275.968 275.968 0 0 1-25.6 115.136l43.2 20.768c19.168-41.568 30.368-87.968 30.368-135.904C832 335.936 688.064 192 512.16 192z m32 422.208c35.136-38.4 35.136-95.936-1.6-132.736a95.136 95.136 0 0 0-132.768-1.6l-127.936-127.936c-16-16-39.968-11.2-51.168 8-65.6 121.536-48 276.64 54.368 379.008s257.504 119.968 379.04 54.368c19.2-9.6 22.4-35.168 8-51.168l-127.968-127.936h0.032z m-94.4-231.872l-20.768-43.2c25.6-12.8 54.4-19.2 83.2-19.2 105.536 0 191.872 86.4 191.872 193.504 0 28.8-8 56-19.2 81.568l-43.168-20.8c9.6-19.2 14.4-39.968 14.4-62.336a143.36 143.36 0 0 0-143.936-143.968 137.472 137.472 0 0 0-62.4 14.4z"
                fill="#483D4E"
                p-id="7320"
              ></path></svg
            >{{ accuracyValue }}ms
          </div>
        </div>
        <div class="right">
          <div @click="showRecordDialog">记录</div>
        </div>
      </div>
      <div id="sport-map" class="map" ref="mapRef"></div>
      <div class="map-inner-control">
        <div class="left"></div>
        <div class="set-center" @click="setUserCenterLocation">
          <svg
            t="1723115273104"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6877"
            width="16"
            height="16"
          >
            <path
              d="M522.666667 394.666667c-70.72 0-128 57.28-128 128s57.28 128 128 128 128-57.28 128-128-57.28-128-128-128zM808.746667 490.666667c-14.72-133.44-120.64-239.36-254.08-254.08V170.666667h-64v65.92c-133.44 14.72-239.36 120.64-254.08 254.08H170.666667v64h65.92c14.72 133.44 120.64 239.36 254.08 254.08V874.666667h64v-65.92c133.44-14.72 239.36-120.64 254.08-254.08H874.666667v-64h-65.92zM522.666667 746.666667C398.826667 746.666667 298.666667 646.506667 298.666667 522.666667S398.826667 298.666667 522.666667 298.666667 746.666667 398.826667 746.666667 522.666667 646.506667 746.666667 522.666667 746.666667z"
              fill="#333333"
              p-id="6878"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="footer-control" v-if="controlsVisible">
      <div class="record-button" v-if="showRecordSportAnimation">
        <button @click="completeRecordSportAnimation">确定</button>
      </div>
      <div v-else class="controls">
        <div class="left">
          <div class="text" v-if="!played">{{ paused ? "继续" : "开始" }}运动</div>
          <div v-else class="time" v-html="sport_time_show"></div>
        </div>
        <div class="center">
          <div class="play_controls" v-if="!played">
            <div class="start circle" @click="start_sport">
              <svg
                t="1723096561603"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4534"
                width="16"
                height="16"
              >
                <path
                  d="M380.677 176.279l390.182 225.272c85.024 49.089 85.024 171.81 0 220.899L380.677 847.721c-85.024 49.089-191.304-12.272-191.304-110.449V286.728c0-98.177 106.28-159.538 191.304-110.449z"
                  fill="#fff"
                  p-id="4535"
                ></path>
              </svg>
            </div>
            <div class="end circle" @click="end_sport" v-if="paused">
              <div class="end-block"></div>
            </div>
          </div>
          <div class="paused circle" v-else @click="pause_sport">
            <svg
              t="1723096843787"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5628"
              width="16"
              height="16"
            >
              <path
                d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"
                fill="#483d4e"
                p-id="5629"
              ></path>
            </svg>
          </div>
        </div>
        <div class="right">
          <div class="text" v-if="!played">运动时间</div>
          <div class="distance" v-else>{{ sport_distance }} 米</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="alert-dialog-panel">
      <Transition name="sliderUp">
        <div class="message-alert" v-if="dialogVisible">
          <div class="detail-box">
            <h1>运动数据</h1>
            <div class="detail">
              <div class="sport_time">
                <div class="label">运动时长：</div>
                <div class="value">
                  {{ formatTime(cacheSaveData.time.hours) }}:{{
                    formatTime(cacheSaveData.time.minutes)
                  }}:{{ formatTime(cacheSaveData.time.seconds) }}
                </div>
              </div>
              <div class="sport_distance">
                <div class="label">运动距离：</div>
                <div class="value">{{ cacheSaveData.distance }} 米</div>
              </div>
            </div>
          </div>
          <div class="close-control">
            <div class="icon" @click="closeDialog">
              <svg
                t="1723192906625"
                class="icon"
                viewBox="0 0 1025 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10421"
                width="16"
                height="16"
              >
                <path
                  d="M512.014 32C246.902 32 32.001 246.895 32.001 512c0 265.103 214.9 480 480.012 480 265.086 0 479.988-214.898 479.988-480 0-265.105-214.903-480-479.987-480zM716.68 671.27c12.5 12.606 12.5 32.918-0.053 45.42-6.25 6.25-14.428 9.373-22.657 9.373s-16.46-3.123-22.71-9.427L511.806 556.168l-159.173 158.02c-6.25 6.25-14.48 9.375-22.657 9.375-8.229 0-16.459-3.23-22.71-9.481-12.499-12.604-12.447-32.916 0.106-45.415l159.171-157.918L309.56 352.782c-12.5-12.58-12.5-32.917 0.053-45.417 12.605-12.527 32.918-12.475 45.366 0.052l157.036 158.021 159.355-158.1c12.552-12.526 32.813-12.5 45.366 0.105 12.5 12.604 12.447 32.891-0.156 45.391L557.3 510.932l159.38 160.339z"
                  p-id="10422"
                  fill="#483d4e"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </Transition>
      <Transition name="fadeIn">
        <div v-if="dialogVisible" class="mask"></div>
      </Transition>
    </div>
    <!-- 运动记录 -->
    <div class="alert-dialog-panel">
      <Transition name="sliderUp">
        <div class="record-list-box" v-if="recordVisible">
          <div class="close-icon" @click="closeRecordDialog">
            <svg
              t="1723192906625"
              class="icon"
              viewBox="0 0 1025 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10421"
              width="16"
              height="16"
            >
              <path
                d="M512.014 32C246.902 32 32.001 246.895 32.001 512c0 265.103 214.9 480 480.012 480 265.086 0 479.988-214.898 479.988-480 0-265.105-214.903-480-479.987-480zM716.68 671.27c12.5 12.606 12.5 32.918-0.053 45.42-6.25 6.25-14.428 9.373-22.657 9.373s-16.46-3.123-22.71-9.427L511.806 556.168l-159.173 158.02c-6.25 6.25-14.48 9.375-22.657 9.375-8.229 0-16.459-3.23-22.71-9.481-12.499-12.604-12.447-32.916 0.106-45.415l159.171-157.918L309.56 352.782c-12.5-12.58-12.5-32.917 0.053-45.417 12.605-12.527 32.918-12.475 45.366 0.052l157.036 158.021 159.355-158.1c12.552-12.526 32.813-12.5 45.366 0.105 12.5 12.604 12.447 32.891-0.156 45.391L557.3 510.932l159.38 160.339z"
                p-id="10422"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <div class="title">运动记录</div>
          <div class="wrapper" v-if="recordList.length > 0">
            <div class="record-list" id="dialog-record-list">
              <div
                class="item"
                @click="onClickRecordItem(item)"
                v-for="(item, index) in recordList"
                :key="index"
              >
                <div class="left">
                  <div class="distance">距离 {{ item.distance }} 米</div>
                  <div class="time">
                    用时
                    {{
                      `${formatTime(item.time.hours)}:${formatTime(
                        item.time.minutes
                      )}:${formatTime(item.time.seconds)}`
                    }}
                  </div>
                </div>
                <div class="right">{{ useDateFormat(new Date(), "M月D日") }}</div>
              </div>
            </div>
          </div>
          <div class="no-record" v-else>暂无记录</div>
        </div>
      </Transition>
      <Transition name="fadeIn">
        <div v-if="recordVisible" class="mask"></div>
      </Transition>
    </div>
    <Transition name="fadeIn">
      <div class="message-tip" v-if="messageDialog.visible">
        {{ messageDialog.text }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
// 插件
const { coords, locatedAt, error, resume, pause } = useGeolocation();
import { useGeolocation, useDateFormat, useNow } from "@vueuse/core";
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { getLocaltion } from "@/utils/map";

// 客户需求变量
var distance = 0;
var time = 0;

// 资源
import user_marker_icon from "./assets/user_location_marker.png";

let app_first_load = true;

const recordList = ref([]);
const showRecordSportAnimation = ref(false);
const recordSportAnimationPlayed = ref(false);

let _map = null; // 地图实例
let _map_convertor = null; // 地图坐标转换实例

let _map_user_marker = null; // 运动时 用户位置图标
let _map_user_polyline = null; // 运动轨迹 实例
let _map_view_animation_polyline = null; // 运动时 关键帧动画实例

let user_sport_point_list = []; // 用户运动时的坐标点

let cacheSaveData = ref({
  time: {
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
  distance: 0,
  date: "",
});

const mapRef = ref();
const mapConfig = {
  zoomSize: 18, // 初始缩放大小
  centerPoint: [116.404, 39.915], // 初始地理坐标
  sportZoomSize: 20, // 定位用户当前坐标的缩放大小
  calcTime: 3000, // 运动时 重新计算当前地理坐标的 单方位时间 单位:ms
  tilt: 30, // 运动时地图倾斜角度
  heading: 15, // 运动时地图旋转角度
  end_sport_animation_time: 10000,

  polyline: {
    // 运动轨迹线配置
    strokeColor: "#3399FF", // 折线颜色
    strokeWeight: 10, // 折线的宽度，以像素为单位
    strokeOpacity: 1, // 折线的透明度，取值范围0 - 1
  },
  localStorageKey: "user_sport_history",
};

const accuracyValue = ref(0);
const userLocation = {
  lng: 0,
  lat: 0,
};

const dialogVisible = ref(false);
const recordVisible = ref(false);

const messageDialog = ref({
  text: "",
  visible: false,
});

const showRecordDialog = () => {
  recordVisible.value = true;
};

const closeRecordDialog = () => {
  recordVisible.value = false;
};

const onClickRecordItem = (item) => {
  if (played.value == true || paused.value == true) {
    // 运动状态禁止播放记录的运动动画
    showMessaegDialog("目前正在运动");
    return;
  }
  recordSportAnimationPlayed.value = false;
  recordVisible.value = false;
  showRecordSportAnimation.value = true;
  user_sport_point_list = item.user_sport_points;
  showSportAnimation();
  setTimeout(
    () => {
      recordSportAnimationPlayed.value = true;
    },
    cacheSaveData.value.distance <= 50 ? 3000 : mapConfig.end_sport_animation_time
  );
};

const completeRecordSportAnimation = () => {
  _map.removeOverlay(_map_view_animation_polyline);
  _map.addOverlay(_map_user_marker);
  showRecordSportAnimation.value = false;
};

// 显示信息
const showMessaegDialog = (text) => {
  messageDialog.value.text = text;
  messageDialog.value.visible = true;
  setTimeout(() => {
    messageDialog.value.text = "";
    messageDialog.value.visible = false;
  }, 1000);
};

const played = ref(false); // 是否运动
const paused = ref(false); // 是否暂停

const start_time = ref(null);

const sport_distance = ref(0);

// 运动计时器
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

// 开始计时
let sportTimer_start_timer = null;
const sportTimer_start = () => {
  start_time.value = new Date().getTime();
  sportTimer_start_timer = setInterval(() => {
    calcSportTime();
  }, 1000);
};
const clearSportTimer = () => {
  clearInterval(sportTimer_start_timer);
  sportTimer_start_timer = null;
};

// 计算时间
const calcSportTime = () => {
  seconds.value++;
  if (seconds.value == 60) {
    seconds.value = 0;
    minutes.value++;
  }
  if (minutes.value == 60) {
    minutes.value = 0;
    hours.value++;
  }
  // 计时峰值，运动结束
  if (hours.value == 24 && minutes.value == 60 && seconds.value == 60) {
    end_sport();
  }
};

const sport_time_show = computed(() => {
  return `${formatTime(
    hours.value
  )}<span style="font-size: 4.6667vw">:</span>${formatTime(
    minutes.value
  )}<span style="font-size: 4.6667vw">:</span>${formatTime(seconds.value)}`;
});
const formatTime = (time) => {
  return parseInt(time) < 10 ? `0${time}` : time;
};

// 开启地图运动动画 || 绘制轨迹线-开启视差效果
const startMapSportAnimation = async () => {
  let { lng, lat } = userLocation;
  // 绘制轨迹线
  drawLine(lng, lat);
  // 根据坐标计算距离
  calcSportDistance();
};

// 绘制轨迹线
const drawLine = (lng, lat) => {
  // 清空轨迹线
  if (_map_user_polyline) {
    _map.removeOverlay(_map_user_polyline);
    _map_user_polyline = null;
  }
  user_sport_point_list.push(new BMapGL.Point(lng, lat));
  // 初始化 并 重新绘制轨迹线
  _map_user_polyline = new BMapGL.Polyline(user_sport_point_list, mapConfig.polyline);
  _map.addOverlay(_map_user_polyline);
};

// 计算轨迹距离
const calcSportDistance = () => {
  let distance = 0;
  for (let index = 0; index < user_sport_point_list.length; index++) {
    let start_point = user_sport_point_list[index];
    let end_point = user_sport_point_list[index + 1];
    if (end_point) {
      let distance_num = _map.getDistance(start_point, end_point);
      distance += distance_num;
    }
  }
  distance = distance.toFixed(2) * 1;
  sport_distance.value = distance;
};

// 开始运动
const start_sport = () => {
  if (dialogVisible.value || !_map) {
    return;
  }
  setTimeout(() => {
    played.value = true; // 设置运动状态为 true
    paused.value = false; // 设置暂停状态为 false
    sportTimer_start();
    setMapOptions();
    setUserCenterLocation();
    // 将起点添加进轨迹线
    user_sport_point_list.push(...[new BMapGL.Point(userLocation.lng, userLocation.lat)]);
  }, 300);
};

// 暂停运动
const pause_sport = () => {
  setTimeout(() => {
    played.value = false; // 设置运动状态为 false
    paused.value = true; // 设置暂停状态为 true
    clearSportTimer();
    setMapOptions();
  }, 300);
};

// 结束运动
const end_sport = () => {
  // 结束运动
  setTimeout(() => {
    played.value = false;
    paused.value = false;
    saveSportInfo();
    resetSportStatus();
  }, 300);
};

const saveUserInfo = () => {
  time =
    cacheSaveData.value.time.hours * 60 * 60 +
    cacheSaveData.value.time.minutes * 60 +
    cacheSaveData.value.time.seconds;
  distance = cacheSaveData.value.distance;
  window.location.href = `userFitnessTestDetail.php?time=${time}&distance=${distance}`;
};

const saveSportInfo = () => {
  // 保存数据
  cacheSaveData.value.time.hours = hours.value;
  cacheSaveData.value.time.minutes = minutes.value;
  cacheSaveData.value.time.seconds = seconds.value;
  cacheSaveData.value.distance = sport_distance.value;
  cacheSaveData.value.date = useDateFormat(new Date(), "YYYY年M月D日");
  cacheSaveData.value.user_sport_points = user_sport_point_list;
  if (
    hours.value > 0 ||
    minutes.value > 0 ||
    (seconds.value > 0 && user_sport_point_list.length > 1)
  ) {
    recordList.value.push(cacheSaveData.value);
    localStorage.setItem(mapConfig.localStorageKey, JSON.stringify(recordList.value));
    showSportAnimation();
    setTimeout(
      () => {
        dialogVisible.value = true;
        _map.addOverlay(_map_user_marker);
      },
      cacheSaveData.value.distance <= 50 ? 3000 : mapConfig.end_sport_animation_time
    );
  }
};

// 重置运动状态
const resetSportStatus = () => {
  _map.removeOverlay(_map_user_polyline); // 移除轨迹线
  hours.value = 0;
  minutes.value = 0;
  seconds.value = 0;
  sport_distance.value = 0;
  user_sport_point_list = []; // 清空运动点
};

// 关闭弹窗
const closeDialog = () => {
  _map.removeOverlay(_map_view_animation_polyline);
  dialogVisible.value = false;
  saveUserInfo();
};

// 地图初始化
const initMap = () => {
  // 116.404, 39.915
  _map = new BMapGL.Map("sport-map"); // 创建Map实例
  _map.centerAndZoom(
    new BMapGL.Point(mapConfig.centerPoint[0], mapConfig.centerPoint[1]),
    mapConfig.zoomSize
  ); // 初始化地图,设置中心点坐标和地图级别
  _map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
  _map_convertor = new BMapGL.Convertor();
  // test()
};

const test = () => {
  let list = [
    new BMapGL.Point(118.1634204176, 25.078325162519),
    new BMapGL.Point(118.16316082617, 25.078074548048),
    new BMapGL.Point(118.16309803885, 25.078028617087),
    new BMapGL.Point(118.16309938702, 25.078024295132),
    new BMapGL.Point(118.16355577635, 25.078473628162),
    new BMapGL.Point(118.16355577635, 25.078473628162),
    new BMapGL.Point(118.16359800698, 25.078519007567),
  ];
  _map_user_polyline = new BMapGL.Polyline(list, mapConfig.polyline);
  _map.addOverlay(_map_user_polyline);
};

const setMapOptions = () => {
  // 设置地图标点图片
  _map.setDisplayOptions({
    poiIcon: !played.value,
  });
};

const setUserLocation = async (lng, lat) => {
  if (_map_user_marker) {
    _map_user_marker.setPosition(new BMapGL.Point(lng, lat));
  }
  // 运动开始加载标点
  if (!_map_user_marker) {
    _map_user_marker = new BMapGL.Marker(new BMapGL.Point(lng, lat), {
      icon: new BMapGL.Icon(
        user_marker_icon,
        new BMapGL.Size(20, 20),
        new BMapGL.Size(32, 32),
        {
          size: new BMapGL.Size(100, 100),
        }
      ),
    });
    _map.addOverlay(_map_user_marker);
    // 设置地图 中心 位置
    _map.setCenter(new BMapGL.Point(lng, lat));
  }
};

const controlsVisible = computed(() => {
  if (showRecordSportAnimation.value) {
    return recordSportAnimationPlayed.value;
  } else {
    return true;
  }
});

const showSportAnimation = () => {
  if (user_sport_point_list.length <= 1) return;
  _map.removeOverlay(_map_user_marker);
  var pl = new BMapGL.Polyline(user_sport_point_list, {
    strokeColor: mapConfig.polyline.strokeColor,
    strokeWeight: 5,
  });
  _map_view_animation_polyline = pl;
  let trackAni = new BMapGLLib.TrackAnimation(_map, pl, {
    overallView: true,
    tilt: 30,
    duration:
      cacheSaveData.value.distance <= 50 ? 3000 : mapConfig.end_sport_animation_time,
    // delay: 300,
  });
  trackAni.start();
};

// 根据用户位置设置中心点
const setUserCenterLocation = () => {
  if (!_map) return;
  _map.setZoom(mapConfig.sportZoomSize);
  nextTick(() => {
    _map.setCenter(new BMapGL.Point(userLocation.lng, userLocation.lat));
  });
};

// 设置地理坐标
const setLocationValue = async () => {
  let { longitude, latitude, accuracy } = coords.value;
  if (longitude && latitude && accuracy) {
    // 应用首次加载
    if (app_first_load) {
      initMap(); // 初始化地图
      app_first_load = false;
    }
    let { lng, lat } = await convertLocation(longitude, latitude);
    accuracyValue.value = accuracy.toFixed(0);
    userLocation.lat = lat;
    userLocation.lng = lng;
    setUserLocation(lng, lat); // 设置用户位置
  }
};

// 转换GPS坐标为百度坐标
const convertLocation = (lng, lat) => {
  return new Promise((resolve, reject) => {
    _map_convertor.translate([new BMapGL.Point(lng, lat)], 1, 5, (data) => {
      if (data.status === 0) {
        resolve(data.points[0]);
      } else {
        return resolve({ lng, lat });
      }
    });
  });
};

// ========================= watch =================================
let sport_animation_timer = null
watch(coords, async () => {
  await setLocationValue();
  if (played.value) {
    // 开启运动轨迹
    if(sport_animation_timer) return
    sportTimer_start_timer = setTimeout(() => {
      startMapSportAnimation();
      clearTimeout(sport_animation_timer);
      sport_animation_timer = null
    }, 3000);
  }
});

onMounted(() => {
  if (error.value && error.value.code == 1) {
    showMessaegDialog(error.value.message);
  }
  let localRecordList = localStorage.getItem(mapConfig.localStorageKey);
  if (localRecordList) {
    recordList.value = JSON.parse(localRecordList);
  }
});
</script>
<style lang="scss">
#sport-map {
  .anchorBL {
    display: none;
  }
}
</style>
<style scoped lang="scss">
.message-tip {
  position: fixed;
  max-width: 80vw;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  inset: 0;
  pointer-events: auto;
}
.record-list-box {
  position: relative;
  z-index: 999;
  width: 600px;
  height: 800px;
  border-radius: 30px;
  background-color: #483d4e;
  padding: 50px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 50px;
  .close-icon {
    position: absolute;
    right: 30px;
    top: 30px;
    pointer-events: auto;
    svg {
      width: 50px;
      height: 50px;
    }
  }
  .title {
    font-size: 40px;
    width: 60%;
    padding-bottom: 20px;
    border-bottom: 2px solid #fff;
  }
  .wrapper {
    overflow-y: auto;
    flex: 1;
    pointer-events: auto;
  }
  .no-record {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    flex: 1;
  }
  .record-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    font-size: 20px;
    .item {
      padding: 20px;
      border: 1px solid #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.alert-dialog-panel {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  pointer-events: none;
}
.message-alert {
  pointer-events: auto;
  position: relative;
  width: 500px;
  height: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  color: #fff;
  gap: 20px;
  z-index: 100;
  .detail-box {
    border-radius: 30px;
    flex: 1;
    background-color: #483d4e;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    .detail {
      display: flex;
      flex-direction: column;
      gap: 20px;
      & > div {
        display: flex;
        gap: 10px;
      }
    }
  }
  .close-control {
    display: flex;
    justify-content: center;
    .icon {
      width: 70px;
      background-color: #fff;
      border-radius: 50%;
      height: 70px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.sport {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  .map-container {
    flex: 1;
    position: relative;
    #sport-map {
      width: 100%;
      height: 100%;
      .anchorBL {
        display: none;
      }
    }
    .map-inner-control {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 9;
      .set-center {
        background-color: #fff;
        width: 80px;
        height: 80px;
        display: flex;
        border-radius: 50%;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        svg {
          width: 60px;
          height: 60px;
        }
      }
    }
    .map-inner-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 20px;
      z-index: 9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 25px;
      .gps-signal {
        display: flex;
        align-items: center;
        svg {
          width: 40px;
          height: 40px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 20px;
        & > div {
          color: #fff;
          text-align: center;
          width: 120px;
          border-radius: 50px;
          padding: 15px;
          background-color: #483d4e;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .footer-control {
    height: 200px;
    background-color: #483d4e;
    .record-button {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      button {
        padding: 30px 80px;
        border-radius: 15px;
        outline: none;
        border: 1px solid transparent;
        font-size: 30px;
        background-color: #7695cf;
        color: #fff;
        transition: all 0.3s;
        &:active {
          transform: scale(0.9);
        }
      }
    }
  }
  .controls {
    height: 100%;
    display: flex;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .left,
    .right {
      color: #fff;
      font-size: 48px;
    }
    .left {
      .time {
        display: flex;
        align-items: center;
      }
      .text {
        font-size: 40px;
      }
    }
    .center {
      .play_controls {
        display: flex;
        gap: 10px;
      }
      .circle {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        svg {
          width: 60px;
          height: 60px;
        }
        &:active {
          transform: scale(0.9);
        }
      }
      .start {
        background-color: #00ca84;
        svg {
          transform: translateX(5px);
        }
      }
      .paused {
        background-color: #fff;
        svg {
          width: 45px;
          height: 45px;
        }
      }
      .end {
        background-color: #ff4d4b;
        .end-block {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
