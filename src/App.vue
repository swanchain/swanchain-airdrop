<template>
  <div class="landing">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="less">
@import "./assets/css/style.css";

.font-75 {
  font-size: 75px;
  @media screen and (min-width: 2160px) {
    font-size: 37.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 56px;
  }
  @media screen and (max-width: 768px) {
    font-size: 112.5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 130px;
  }
  @media screen and (max-width: 540px) {
    font-size: 150px;
  }
}
.font-72 {
  font-size: 72px;
  @media screen and (min-width: 2160px) {
    font-size: 36px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 54px;
  }
  @media screen and (max-width: 768px) {
    font-size: 108px;
  }
  @media screen and (max-width: 600px) {
    font-size: 125px;
  }
  @media screen and (max-width: 540px) {
    font-size: 148px;
  }
}
.font-68 {
  font-size: 68px;
  @media screen and (min-width: 2160px) {
    font-size: 34px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 51px;
  }
  @media screen and (max-width: 768px) {
    font-size: 102px;
  }
  @media screen and (max-width: 600px) {
    font-size: 123px;
  }
  @media screen and (max-width: 540px) {
    font-size: 144px;
  }
}
.font-65 {
  font-size: 65px;
  @media screen and (min-width: 2160px) {
    font-size: 32px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 48.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 97px;
  }
  @media screen and (max-width: 600px) {
    font-size: 120px;
  }
  @media screen and (max-width: 540px) {
    font-size: 140px;
  }
}
.font-55 {
  font-size: 55px;
  @media screen and (min-width: 2160px) {
    font-size: 27px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 41px;
  }
  @media screen and (max-width: 768px) {
    font-size: 82px;
  }
  @media screen and (max-width: 600px) {
    font-size: 110px;
  }
  @media screen and (max-width: 540px) {
    font-size: 127px;
  }
}
.font-50 {
  font-size: 50px;
  @media screen and (min-width: 2160px) {
    font-size: 25px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 37.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 75px;
  }
  @media screen and (max-width: 600px) {
    font-size: 100px;
  }
  @media screen and (max-width: 540px) {
    font-size: 124px;
  }
}
.font-48 {
  font-size: 48px;
  @media screen and (min-width: 2160px) {
    font-size: 24px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 36px;
  }
  @media screen and (max-width: 768px) {
    font-size: 72px;
  }
  @media screen and (max-width: 600px) {
    font-size: 96px;
  }
  @media screen and (max-width: 540px) {
    font-size: 120px;
  }
}
.font-46 {
  font-size: 46px;
  @media screen and (min-width: 2160px) {
    font-size: 23px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 34.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 69px;
  }
  @media screen and (max-width: 600px) {
    font-size: 98px;
  }
  @media screen and (max-width: 540px) {
    font-size: 118px;
  }
}
.font-45 {
  font-size: 45px;
  @media screen and (min-width: 2160px) {
    font-size: 22.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 32.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 67.5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 101px;
  }
  @media screen and (max-width: 540px) {
    font-size: 135px;
  }
}
.font-42 {
  font-size: 42px;
  @media screen and (min-width: 2160px) {
    font-size: 21px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 31px;
  }
  @media screen and (max-width: 768px) {
    font-size: 63px;
  }
  @media screen and (max-width: 600px) {
    font-size: 94px;
  }
  @media screen and (max-width: 540px) {
    font-size: 116px;
  }
}
.font-40 {
  font-size: 40px;
  @media screen and (min-width: 2160px) {
    font-size: 20px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 30px;
  }
  @media screen and (max-width: 768px) {
    font-size: 60px;
  }
  @media screen and (max-width: 600px) {
    font-size: 90px;
  }
  @media screen and (max-width: 540px) {
    font-size: 110px;
  }
}
.font-38 {
  font-size: 38px;
  @media screen and (min-width: 2160px) {
    font-size: 19px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 28.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 57px;
  }
  @media screen and (max-width: 600px) {
    font-size: 102px;
  }
  @media screen and (max-width: 540px) {
    font-size: 114px;
  }
}
.font-35 {
  font-size: 35px;
  @media screen and (min-width: 2160px) {
    font-size: 17.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 26px;
  }
  @media screen and (max-width: 768px) {
    font-size: 52.5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 80px;
  }
  @media screen and (max-width: 540px) {
    font-size: 105px;
  }
}
.font-33 {
  font-size: 33px;
  @media screen and (min-width: 2160px) {
    font-size: 16.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 25px;
  }
  @media screen and (max-width: 768px) {
    font-size: 49.5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 77px;
  }
  @media screen and (max-width: 540px) {
    font-size: 99px;
  }
}
.font-32 {
  font-size: 32px;
  @media screen and (min-width: 2160px) {
    font-size: 16px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 24px;
  }
  @media screen and (max-width: 768px) {
    font-size: 48px;
  }
  @media screen and (max-width: 600px) {
    font-size: 74px;
  }
  @media screen and (max-width: 540px) {
    font-size: 96px;
  }
}
.font-30 {
  font-size: 30px;
  @media screen and (min-width: 2160px) {
    font-size: 15px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 22px;
  }
  @media screen and (max-width: 768px) {
    font-size: 45px;
  }
  @media screen and (max-width: 600px) {
    font-size: 70px;
  }
  @media screen and (max-width: 540px) {
    font-size: 90px;
  }
}
.font-27 {
  font-size: 27px;
  @media screen and (min-width: 2160px) {
    font-size: 13.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
  @media screen and (max-width: 600px) {
    font-size: 56px;
  }
  @media screen and (max-width: 540px) {
    font-size: 71px;
  }
}
.font-26 {
  font-size: 26px;
  @media screen and (min-width: 2160px) {
    font-size: 13px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 19.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 39px;
  }
  @media screen and (max-width: 600px) {
    font-size: 58.5px;
  }
  @media screen and (max-width: 540px) {
    font-size: 78px;
  }
}
.font-24 {
  font-size: 24px;
  @media screen and (min-width: 2160px) {
    font-size: 12px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
  @media screen and (max-width: 600px) {
    font-size: 54px;
  }
  @media screen and (max-width: 540px) {
    font-size: 72px;
  }
}
.font-23 {
  font-size: 23px;
  @media screen and (min-width: 2160px) {
    font-size: 11.5px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 17px;
  }
  @media screen and (max-width: 768px) {
    font-size: 34.5px;
  }
  @media screen and (max-width: 600px) {
    font-size: 51px;
  }
  @media screen and (max-width: 540px) {
    font-size: 69px;
  }
}
.font-22 {
  font-size: 22px;
  @media screen and (min-width: 2160px) {
    font-size: 11px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    font-size: 33px;
  }
  @media screen and (max-width: 600px) {
    font-size: 50px;
  }
  @media screen and (max-width: 540px) {
    font-size: 66px;
  }
}
.font-20 {
  font-size: 20px;
  @media screen and (min-width: 2160px) {
    font-size: 10px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 30px;
  }
  @media screen and (max-width: 600px) {
    font-size: 45px;
  }
  @media screen and (max-width: 540px) {
    font-size: 60px;
  }
}
.font-18 {
  font-size: 18px;
  @media screen and (min-width: 2160px) {
    font-size: 9px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 13px;
  }
  @media screen and (max-width: 768px) {
    font-size: 26px;
  }
  @media screen and (max-width: 600px) {
    font-size: 40px;
  }
  @media screen and (max-width: 540px) {
    font-size: 54px;
  }
}
.font-16 {
  font-size: 16px;
  @media screen and (min-width: 2160px) {
    font-size: 8px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
  @media screen and (max-width: 600px) {
    font-size: 38px;
  }
  @media screen and (max-width: 540px) {
    font-size: 48px;
  }
}
.font-14 {
  font-size: 14px;
  @media screen and (min-width: 2160px) {
    font-size: 7px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 11px;
  }
  @media screen and (max-width: 768px) {
    font-size: 21px;
  }
  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
  @media screen and (max-width: 540px) {
    font-size: 42px;
  }
}
.font-12 {
  font-size: 12px;
  @media screen and (min-width: 2160px) {
    font-size: 6px;
  }
  @media screen and (min-width: 2366px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
  @media screen and (max-width: 600px) {
    font-size: 29px;
  }
  @media screen and (max-width: 540px) {
    font-size: 36px;
  }
}

.uppercase {
  text-transform: uppercase;
}

.font-black {
  font-family: "Montserrat-Black";
}
.font-bold {
  font-family: "Montserrat-ExtraBold";
}

.text-center {
  text-align: center;
}

.weight-3 {
  font-weight: 300;
}
.weight-4 {
  font-weight: 400;
}
.weight-5 {
  font-weight: 500;
}
.weight-6 {
  font-weight: 600;
}
.weight-7 {
  font-weight: 700;
}
.weight-8 {
  font-weight: 800;
}

.flex-row {
  display: flex !important;
  align-items: center;
  flex-wrap: wrap;
  &.space-between {
    justify-content: space-between;
  }
  &.center {
    justify-content: center;
  }
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.nowrap {
    flex-wrap: nowrap;
  }
}

.claim-list {
  border-radius: 12px !important;
  .el-scrollbar {
    border-radius: 12px;
    .el-select-dropdown__item {
      height: auto;
      padding: 8px 24px;
      font-family: inherit;
      font-size: inherit;
      line-height: 1.3;
    }
  }
}
</style>
