<template>
  <div>
    <div v-if="showSetFood"  class="food-model" :style="{ display: showSubFoodModal ? 'none' : 'block'}" >
    <div @click.stop="onClickSetFoodCloseBtn" class="shade"></div>
  <div class="model-box _bg2">
    <!-- food start -->
    <div class="model-food">
      <div class="model-food_img border" :class="foodSetDisplay?'big-mode':''">
      <img alt  v-if="composeFood.imagePath" :src="changeSize(composeFood.imagePath, 1.54, 1.54, true,'setFood')"  class="model-food_img" :class="foodSetDisplay?'big-mode':''" />
    <img alt v-else class="model-food_img" :class="foodSetDisplay?'big-mode':''" src="../../../assets/images/default_menu_bg_w.png" />
</div>
<div class="model-food_info">
  <div class="food-info_name">
    <div class="info-name_text _c1 _c1">{{composeFood.displayName}}</div>
    <div @click.stop="onClickSetFoodCloseBtn" class="info-name_close">
    <SvgIcon name="menuDetailClose"  :color="getSvgColor(5)" height="0.32" width="0.32"></SvgIcon>
</div>
</div>
<div>
  <div class="food-tags" v-if="promotion.prolist1.length && promotion.prolist2.length">
    <section class="food-tag" v-if="promotion.prolist1.length">
      <span  :key="`prolist1_${proIndex}`" v-for="(pro, proIndex) of promotion.prolist1" class="prolist1-item">{{pro.promotionName}}</span>
  </section>
  <section class="food-tag" v-if="promotion.prolist2.length">
    <span :key="`prolist2_${proIndex}`"  v-for="(pro, proIndex) of promotion.prolist2" class="prolist2-item _bg5">{{pro.promotionName}}</span>
</section>
</div>
<div class="food-info_spec _c3"  v-if="composeFood.clickAlertMess">{{composeFood.clickAlertMess}}</div>
<div class="food-info_spec _c3" v-html="composeFoodHeadTip" v-if="composeFoodHeadTip"></div>
</div>
<div class="food-info_bottom" v-if="quickHandle">
  <div class="food_price_wrap">
    <div class="food-info_vipwrap">
      <VipPriceContent v-if="(!composeFood.specialPrice||composeFood.specialPrice===0)&&(composeFood.vipPrice < composeFood.price) && composeFood.customCategoryID!=='-2'" v-show="menuDecorate && menuDecorate.displayVipPrice == 1" :vipPrice="toFix(totalVipPrice)"></VipPriceContent>
    <SpecialRule  v-if="$parent.showSpecialPrice(composeFood)"  :count="composeFood.foodLimit" :priceObj="composeFood"></SpecialRule>
</div>
<div class="food-info_curprice _mc">
  <span class="info-curprice_prefix">{{''|s}}</span>
  <span v-if="$parent.showSpecialPrice(composeFood)" class="info-curprice_amount">
                        <span >{{totalSpecialPrice}}</span>
                        <span class="price_remove">
                       <span >{{''|s}}{{toFix(totalPrice)}}</span>
                       </span>
                  </span>
  <span  v-else class="info-curprice_amount">{{toFix(totalPrice)}}</span>
  <span class="food-unit _c2">/{{$ts(composeFood.unit,'unit')}}</span>
</div>
</div>
<div class="small-food_right quick_right _c1">
                <span class="food-button">
                  <p :class="['hll-comp-minus _mb', {'_bc2':quickMinusDisabled}]" @click="quickHandleMinus(composeFood,$event )">
                    <span :class="['menu-btn_svg minus _mbg_jb',{'_bg3':quickMinusDisabled}]"></span>
</p>
<span class="food-counter _c1">{{Math.max(composeFood.count,1)}}</span>
<p :class="['hll-comp-plus _mbg_jb']" @click="quickHandlePlus(composeFood, $event)">
<span class="menu-btn_svg plus-across _bg4"></span>
<span class="menu-btn_svg plus-vertical _bg4"></span>
</p>
</span>
</div>
</div>
</div>
</div>
<!-- food end -->
<!-- main title end -->
<div class="scroll-content">
  <div  style="padding-bottom: .28rem">
    <!-- 套餐子菜 start -->
    <div class="small-food_wrap" v-if="composeFood && composeFood.foodSetCategories && composeFood.foodSetCategories.length">
      <template v-for="(group, groupIndex) in composeFood.foodSetCategories">
        <div :key="groupIndex" class="title-hasline">
        <div class="title-hasline_line _mbg"></div>
        <div class="title-hasline_text _c2">{{group.foodCategoryName}}</div>
        <!--<div v-if="group.canSwitch === '0'"  class="small-food_tag must">{{$t('必选品')}}</div>-->
        <span v-if="group.canSwitch !== '0'" class="title-hasline_text-desc _c2 _bc1">
                  <template v-if="(group.chooseCount-(group.count || 0)) && group.chooseCount">
                  <span class="can-select">{{$t('需选择')}}{{group.chooseCount ?`${group.chooseCount}${$t('份')}`:''}},</span>
                  <span class="has-select">{{$t('还差\n')}}{{(group.chooseCount-(group.count || 0))}}{{' '+$t('份')}}</span>
                  </template>
                  <span class="can-select" v-else>{{$t('已选择')}}{{group.count || 0}}{{$t('份')}}</span>
                </span>
    </div>
    <!--todo 原来的展现模式 根据装修数据进行分别展示-->
    <template v-if="foodSetDisplay===0">
      <template  v-for="(item, itemIndex) in group.foodSetDetails">
        <div :key="`${groupIndex}-${itemIndex}`" class="small-food">
        <div class="small-food_left">
          <div class="small-food_img border">
            <img alt :src="changeSize(menuImages[item.foodName],1.2,1.2,true)" class="small-food_img" v-if="menuImages[item.foodName]"/>
          <img alt v-else  class="small-food_img" src="../../../assets/images/default_menu_bg_w.png" />
        </div>
        <div class="small-food_info">
          <div class="small-food_foodname _c1">
            {{$parent.foodDisplayName(item)}}
            <span class="food-name-unit _c3">/{{$ts(item.unit,'unit')}}<span class="_bg9" v-if="item.number>1">x{{item.number}}</span></span>
          </div>
          <div class="small-food_price-wrap">
            <div class="small-food_price _c1"  :class="[item.addPrice?'price_remove':'']">
            <span class="small-food_amount-prefix">{{"" | s}}</span>
            <span class="small-food_amount">{{toFix((item.price||0)* (item.number||1))}}</span>
          </div>
          <div class="small-food_tag" v-if="item.addPrice">
            <span class="a">{{$t('\n加') }} </span>
            <span class="b">{{"" | s  }}</span>
            <span class="c">{{toFix((item.addPrice||0)* (item.number||1))}}</span>
          </div>
        </div>
        <div class="small-food_taste _c3" v-if="group.canSwitch === '1'&&item.count && getSelectedTaste(item.foodTastes)">{{getSelectedTaste(item.foodTastes)}}</div>
  </div>
</div>

<div v-if="group.canSwitch === '0'" class="small-food_right guding-right must _c2" >
  <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
  <span v-else-if="zicaiSoldOut(item)||item.soldOut" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
  <template v-else>
    <span  class="must_count" >×{{item.number}}</span>
    <div v-if="showGdDIY(group)" class="food_diy small-food_diy _c2">
      <span  v-if="showGdDIYSelf(item)" @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">{{$t('去定制')}}</span>
  <!--<span class="small-food_amount-prefix">{{"" | s}}</span>
  <span class="small-food_amount">{{toFix((item.price||0)* (item.number||1))}}</span>-->
</div>
</template>

</div>
<div  v-else  class="small-food_right _c1">
  <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
  <span v-else-if="zicaiSoldOut(item)||item.soldOut" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
  <span class="food-button" v-else>
                      <p @click="onClickSetmealOptionMinusBtn(groupIndex, itemIndex)" class="hll-comp-minus _mb" v-show="item.count">
                        <span class="menu-btn_svg minus _mbg_jb"></span>
                      </p>
  <span class="food-counter _c1" v-show="item.count">{{item.count}}</span>
  <p :class="['hll-comp-plus _mbg_jb', {_bg3: zicaiCanPlus(group,item, groupIndex)}]"
  @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">
  <span class="menu-btn_svg plus-across _bg4"></span>
  <span class="menu-btn_svg plus-vertical _bg4"></span>
</p>
</span>
</div>
</div>
</template>
</template>
<template v-else-if="foodSetDisplay===1">
  <div class="big-food-wraper">
    <template v-for="(item, itemIndex) in group.foodSetDetails">
      <div :key="`${groupIndex}-${itemIndex}`" class="big-food">
      <div class="big-food_top">
        <span v-if="notGoodTime(item)" class="sell-out">{{$t('非可售时间')}}</span>
        <span v-else-if="zicaiSoldOut(item)||item.soldOut" class="sell-out">{{ $t(shopSetting.sellOutFoodComment) }}</span>
        <img alt :src="changeSize(menuImages[item.foodName],3.03,3.03,true)" class="big-food_img" v-if="menuImages[item.foodName]"/>
      <img alt v-else  class="big-food_img" src="../../../assets/images/default_menu_bg_w.png" />
  </div>
  <div class="bf-wraper_bottom">
    <!--名字 单位-->
    <span class="big-food_name _c1">
                          <span>{{$parent.foodDisplayName(item)}}</span>
                          <span class="name-unit _c3">/{{$ts(item.unit,'unit')}}</span>
                        </span>
    <!--口味 做法-->
    <!---->
    <!--                        <span class="big-food_taste _c3" v-if="item.count && getSelectedTaste(item.foodTastes)">{{getSelectedTaste(item.foodTastes) || ''}}</span>
                            <span v-else class="big-food_taste _c3" ></span>-->
    <!--vip价格 下一期的-->
    <!--<span></span>-->
    <!--价格 份数-->
    <span v-if="group.canSwitch === '0'" class="guding-price">
                            <span class="big-food_right must _c1" v-if="group.canSwitch === '0'">×{{item.number}}</span>
                             <div class="big-food_price  _c1">
                                <span class="big_amount-prefix _c3">{{"" | s}}</span>
                                <span class="big_amount">{{toFix((item.price||0)* (item.number||1))}}</span>
                               <!--<span class="small-food_tag big_tag" v-if="item.addPrice">+{{"" | s}}{{toFix((item.addPrice||0)* (item.number||1))}}</span>-->
                             </div>
                        </span>
    <div v-else>
      <div class="big-food_price  _c1" :class="[item.addPrice?'price_remove':'']">
      <span class="big_amount-prefix _c3">{{"" | s}}</span>
      <span class="big_amount" :class="[zicaiSoldOut(item)||item.soldOut?'_c3':'']">{{toFix((item.price||0)* (item.number||1))}}</span>
    <span class="small-food_tag big_tag" :class="[zicaiSoldOut(item)||item.soldOut?'sold-out small-food_tag-sold':'']" v-if="item.addPrice">
    <span class="a">{{$t('\n加')}} </span>
    <span class="b">{{"" | s  }}</span>
    <span class="c">{{toFix((item.addPrice||0)* (item.number||1))}}</span>
  </span>
</div>
<!--加减菜按钮-->
<div class="big-food_bottom">
  <span class="number _c3" v-if="item.number>1">x{{item.number}}</span>
  <span class="number _c3" v-else></span>
  <span class="food-button">
                              <p @click="onClickSetmealOptionMinusBtn(groupIndex, itemIndex)" class="hll-comp-minus _mb" v-show="item.count">
                                <span class="menu-btn_svg minus _mbg_jb"></span>
                              </p>
  <span class="food-counter _c1" v-show="item.count">{{item.count}}</span>
  <p :class="['hll-comp-plus _mbg_jb', {'_bg3':zicaiCanPlus(group,item, groupIndex)}]"
  @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">
  <span class="menu-btn_svg plus-across _bg4"></span>
  <span class="menu-btn_svg plus-vertical _bg4"></span>
</p>
</span>
</div>
</div>
<div v-if="showGdDIY(group)" class="food_diy big_food_diy _c2">
  <span  v-if="showGdDIYSelf(item)" @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">{{$t('去定制')}}</span>
</div>
</div>
</div>
</template>
</div>
</template>
<template v-else-if="[2,3].includes(foodSetDisplay)">
  <div class="two-food-wraper">
    <template v-for="(item, itemIndex) in group.foodSetDetails">
      <div :key="`${groupIndex}-${itemIndex}`" :class="[foodSetDisplay===3?'no-pic-food':'two-food','qh_bg',group.canSwitch === '1'&&item.count?'food-selected':'']">
      <div class="two-left" v-if="foodSetDisplay===2">
        <img alt :src="changeSize(menuImages[item.foodName],1.15,1.15,true)" class="two-food_img" v-if="menuImages[item.foodName]"/>
      <img alt v-else  class="two-food_img" src="../../../assets/images/default_menu_bg_w.png" />
  </div>
  <div class="two-content">
    <div class="two-name-unit">
                            <span class="name-unit">
                                <span :class="[foodSetDisplay===2?'two-food_name':'food_name', '_c1']">{{$parent.foodDisplayName(item)}}</span>
      <span class="two-unit _c3">{{$ts(item.unit,'unit')}}</span>
    </span>
    <span v-if="item.number>1" class="_c3">×{{item.number}}</span>
  </div>
  <!--此处展示  子菜为加价    配菜为会员价-->
  <div class="two-food_tag" v-if="[2,3].includes(foodSetDisplay)&& item.addPrice">
    <span class="a">{{$t('\n加') }} </span>
    <span class="b">{{"" | s  }}</span>
    <span class="c">{{toFix((item.addPrice||0)* (item.number||1))}}</span>
  </div>
  <div class="two-content-bottom">
                            <span class="price-wrap">
                               <div class="two-food_price  _c1">
                                  <span class="two-prefix">{{"" | s}}</span>
                                  <span class="two-amount">{{toFix((item.price||0)* (item.number||1))}}</span>
                               </div>
                              <span class="two-count"  v-if="group.canSwitch === '0'" >
                                 <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
                                <span v-else-if="zicaiSoldOut(item)||item.soldOut" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
                                <div v-else-if="showGdDIY(group)" class="food_diy two_food_diy _c2">
                                 <span  v-if="showGdDIYSelf(item)" @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">{{$t('去定制')}}</span>
  </div>
</span>
<span class="two-count"  v-if="group.canSwitch === '1'" >
                                   <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
                                    <span v-else-if="zicaiSoldOut(item)||item.soldOut" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
                                    <span class="food-button" v-else>
                                            <p @click="onClickSetmealOptionMinusBtn(groupIndex, itemIndex)" class="hll-comp-minus _mb" v-show="item.count">
                                              <span class="menu-btn_svg minus _mbg_jb"></span>
                                            </p>
                                            <span class="food-counter _c1" v-show="item.count">{{item.count}}</span>
                                            <p :class="['hll-comp-plus _mbg_jb', {_bg3: zicaiCanPlus(group,item, groupIndex)}]" @click="onClickSetmealOptionPlusBtn(groupIndex, itemIndex,{isSoldOut:isSoldOut(item),showChildWin:true})">
                                              <span class="menu-btn_svg plus-across _bg4"></span>
                                              <span class="menu-btn_svg plus-vertical _bg4"></span>
                                            </p>
</span>
</span>
</span>
</div>
</div>
</div>
</template>
</div>
</template>
</template>
</div>
<!-- 套餐子菜 end -->

<!-- 规格 start -->
<template v-if="composeFood.units.length > 1">
  <div class="title-hasline">
    <div class="title-hasline_line _mbg"></div>
    <div class="title-hasline_text _c2">{{$t('规格')}}  <span class="title-hasline_text-desc _c2 _bc1">{{$t('必选')}}</span></div>
  </div>
  <div class="model-checklist_wrap">
    <div
    :class="['model-checklist_item _c1', {_mc: item.isChecked, qh_bg: !item.isChecked}]"
    :key="`${itemIndex}`"
    @click="chooseUnit(itemIndex)"
       v-for="(item, itemIndex) in composeFood.units"
  >
                <span
    :class="['model-checklist_item-text', {_mbg_checked: item.isChecked}]"
  >{{$ts(item.unit,'unit')}}</span>
</div>
</div>
</template>
<!-- 规格 end -->

<!-- 口味 做法 start -->
<template v-if="composeFood.foodTastes.length">
  <template v-for="(group, groupIndex) in composeFood.foodTastes">
    <div  :key="`${groupIndex}-title`" class="title-hasline">
    <div class="title-hasline_line _mbg"></div>
    <div class="title-hasline_text _c2">
      <span v-if="group.type=='20'">{{$ts(group.desc,'cookeGroup')}}</span>
      <span v-if="group.type=='30'">{{$ts(group.desc,'tasteGroup')}}</span>
    </div>
    <span class="title-hasline_text-desc _c2 _bc1" v-if="tasteCheckedTips(formatTasteNum(group))" v-html="tasteCheckedTips(formatTasteNum(group))"></span>
  </div>
  <div :key="`${groupIndex}-checklist`" class="model-checklist_wrap">
  <div :class="['model-checklist_item _c1', {_mc: item.isChecked, qh_bg: !item.isChecked}]" :key="`${itemIndex}`"
  @click="onClickSpecItem(groupIndex, itemIndex)" v-for="(item, itemIndex) in group.tasteOption">
  <span :class="['model-checklist_item-text', item.tasteGG||setMutualExclusion(group,item.tasteValue && item.tasteValue.split('@')[0])?'_bg2 _mbg_disabled':'', {_mbg_checked: item.isChecked}]">{{  $ts(item.tasteValue && item.tasteValue.split('@')[0],'taste')}}</span>
<div class="model-checklist_item-dot model-checklist_item-dot-gg" v-if="item.tasteGG">{{$t('售罄')}}</div>
<div class="model-checklist_item-dot" v-else-if="showAddPrice(item)">+{{'' | s}}{{getValue(item)}}</div>
</div>
</div>
</template>
</template>
<!-- 口味 做法 end -->

<!-- 配菜 start -->
<template v-for="(selfDish,dishIndex) in composeFood.sideDishGroups">
  <template v-if="showSideDish(selfDish)">
    <div class="title-hasline">
      <div class="title-hasline_line _mbg"></div>
      <div class="title-hasline_text _c2">{{selfDish.groupName}}</div>
      <div class="title-hasline_text-desc _c2 _bc1" v-if="tasteCheckedTips(getSideDishTip(composeFood,dishIndex))"  v-html="tasteCheckedTips(getSideDishTip(composeFood,dishIndex))">
      </div>
    </div>
    <div>
      <template v-if="foodSetDisplay===0">
        <template v-for="(item, itemIndex) in selfDish.sideDishes">
          <template v-for="(unit, unitIndex) in item.units">
            <div :key="`${itemIndex}-${unitIndex}`" class="small-food" v-show ="shopSetting.showSellOutFood|| !sideSoldOut(item)">
            <div class="small-food_left">
              <div class="small-food_img border">
                <img alt  :src="changeSize(menuImages[item.foodName],1.2,1.2,true)"  class="small-food_img" v-if="menuImages[item.foodName]"/>
              <img alt  class="small-food_img" src="../../../assets/images/default_menu_bg_w.png" v-else/>
            </div>
            <div class="small-food_info">
              <div class="small-food_foodname _c1">{{$parent.foodDisplayName(item)}}
                <span class="food-name-unit _c3">/{{$ts(item.units[0].unit,'unit')}}</span>
              </div>
              <div class="small-food_price-wrap">
                <div class="small-food_price _c1" v-if="unit.price>=0">
                  <span class="small-food_amount-prefix">{{"" | s}}</span>
                  <span class="small-food_amount">{{unit.price}}</span>
                </div>
                <div class="food-info_vipwrap" style="margin-bottom: 0" v-if="unit.vipPrice < unit.price" v-show="menuDecorate && menuDecorate.displayVipPrice == 1">
                  <VipPriceContent :vipPrice="unit.vipPrice"></VipPriceContent>
              </div>
            </div>
    </div>
  </div>
  <div class="small-food_right _c1">
    <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
    <span v-else-if="sideSoldOut(item)" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
    <span class="food-button" v-else>
                              <p @click="onClickRemoveSideDishFromCart(itemIndex, unitIndex,dishIndex)"
          class="hll-comp-minus _mb" v-show="unit.count">
                                <span class="menu-btn_svg minus _mbg_jb"></span>
                              </p>
    <span class="food-counter _c1" v-show="unit.count">{{ unit.count }}</span>
    <p
    :class="['hll-comp-plus _mbg_jb', {_bg3: disableSideDishBtn(composeFood,selfDish,dishIndex,itemIndex) || setMutualExclusion(selfDish,item.foodName)}]"
    @click="onClickAddSideDishToCart(itemIndex, unitIndex,dishIndex)">
    <span class="menu-btn_svg plus-across _bg4"></span>
    <span class="menu-btn_svg plus-vertical _bg4"></span>
  </p>
</span>
</div>
</div>
</template>
</template>
</template>
<template v-else-if="foodSetDisplay===1">
  <div class="big-food-wraper">
    <template v-for="(item, itemIndex) in selfDish.sideDishes">
      <template v-for="(unit, unitIndex) in item.units">
        <div :key="`${itemIndex}-${unitIndex}`" class="big-food" v-show ="shopSetting.showSellOutFood|| !sideSoldOut(item)">
        <div class="big-food_top">
          <span v-if="notGoodTime(item)" class="sell-out">{{$t('非可售时间')}}</span>
          <span v-else-if="sideSoldOut(item)" class="sell-out">{{ $t(shopSetting.sellOutFoodComment) }}</span>
          <img alt :src="changeSize(menuImages[item.foodName],3.03,3.03,true)" class="big-food_img" v-if="menuImages[item.foodName]"/>
        <img alt v-else  class="big-food_img" src="../../../assets/images/default_menu_bg_w.png" />
  </div>
  <div class="bf-wraper_bottom">
    <!--名字 单位-->
    <span class="big-food_name _c1">
                                      <span>{{$parent.foodDisplayName(item)}}</span>
                                      <span class="name-unit _c3">/{{$ts(item.units[0].unit,'unit')}}</span>
                                    </span>
    <!--vip价格 下一期的-->
    <!--<span></span>-->
    <div class="food-info_vipwrap"  style="margin-top: 0.1rem;margin-bottom:0"  v-if="unit.vipPrice < unit.price" v-show="menuDecorate && menuDecorate.displayVipPrice == 1">
      <VipPriceContent :vipPrice="unit.vipPrice"></VipPriceContent>
  </div>
  <span v-else class="big-vip-price-none"></span>
  <!--价格 份数-->
  <div >
    <div class="big-food_price  _c1" v-if="unit.price>=0">
      <span class="big_amount-prefix _c3">{{"" | s}}</span>
      <span class="big_amount"  :class="[sideSoldOut(item)?'_c3':'']">{{unit.price}}</span>
  </div>
  <!--加减菜按钮-->
  <span class="food-button">
                                           <p @click="onClickRemoveSideDishFromCart(itemIndex, unitIndex,dishIndex)" class="hll-comp-minus _mb" v-show="unit.count">
                                            <span class="menu-btn_svg minus _mbg_jb"></span>
                                          </p>
  <span class="food-counter _c1" v-show="unit.count">{{unit.count}}</span>
  <p :class="['hll-comp-plus _mbg_jb', {_bg3:notGoodTime(item) || sideSoldOut(item)||disableSideDishBtn(composeFood,selfDish,dishIndex,itemIndex)|| setMutualExclusion(selfDish,item.foodName)}]" @click="onClickAddSideDishToCart(itemIndex, unitIndex,dishIndex)">
  <span class="menu-btn_svg plus-across _bg4"></span>
  <span class="menu-btn_svg plus-vertical _bg4"></span>
</p>
</span>
</div>
</div>
</div>
</template>
</template>
</div>
</template>
<template v-else-if="[2,3].includes(foodSetDisplay)">
  <div class="two-food-wraper">
    <template v-for="(item, itemIndex) in selfDish.sideDishes">
      <template v-for="(unit, unitIndex) in item.units">
        <div :key="`${itemIndex}-${unitIndex}`" :class="[foodSetDisplay===3?'no-pic-food':'two-food','qh_bg',unit.count?'food-selected':'']">
        <div class="two-left" v-if="foodSetDisplay===2">
          <img alt :src="changeSize(menuImages[item.foodName],1.15,1.15,true)" class="two-food_img" v-if="menuImages[item.foodName]"/>
        <img alt v-else  class="two-food_img" src="../../../assets/images/default_menu_bg_w.png" />
  </div>
  <div class="two-content">
    <div class="two-name-unit">
                                <span class="name-unit">
                                    <span :class="[foodSetDisplay===2?'two-food_name':'food_name', '_c1']">{{$parent.foodDisplayName(item)}}</span>
      <span class="two-unit _c3">{{$ts(item.units[0].unit,'unit')}}</span>
    </span>
  </div>
  <!--此处展示  子菜为加价    配菜为会员价-->
  <div class="food-info_vipwrap"  style="margin-top: 0.1rem"  v-if="unit.vipPrice < unit.price   && foodSetDisplay===2" v-show="menuDecorate && menuDecorate.displayVipPrice == 1">
    <VipPriceContent :vipPrice="unit.vipPrice"></VipPriceContent>
</div>

<div class="two-content-bottom">
                              <span class="price-wrap">
                                <div class="original-price">
                                  <div class="two-food_price  _c1" v-if="unit.price>=0">
                                      <span class="two-prefix">{{"" | s}}</span>
                                      <span class="two-amount"  :class="[sideSoldOut(item)?'_c3':'']">{{unit.price}}</span>
</div>
<div class="food-info_vipwrap"   v-if="unit.vipPrice < unit.price   && foodSetDisplay===3" v-show="menuDecorate && menuDecorate.displayVipPrice == 1">
  <VipPriceContent :vipPrice="unit.vipPrice"></VipPriceContent>
</div>
</div>
<span class="two-count" >
                                    <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
                                    <span v-else-if="sideSoldOut(item)" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
                                     <span class="food-button" v-else>
                                           <p @click="onClickRemoveSideDishFromCart(itemIndex, unitIndex,dishIndex)" class="hll-comp-minus _mb" v-show="unit.count">
                                            <span class="menu-btn_svg minus _mbg_jb"></span>
                                          </p>
                                          <span class="food-counter _c1" v-show="unit.count">{{unit.count}}</span>
                                          <p :class="['hll-comp-plus _mbg_jb', {_bg3: notGoodTime(item) || sideSoldOut(item)||disableSideDishBtn(composeFood,selfDish,dishIndex,itemIndex)|| setMutualExclusion(selfDish,item.foodName)}]" @click="onClickAddSideDishToCart(itemIndex, unitIndex,dishIndex)">
                                            <span class="menu-btn_svg plus-across _bg4"></span>
                                            <span class="menu-btn_svg plus-vertical _bg4"></span>
                                          </p>
</span>
</span>
</span>
</div>
</div>
</div>
</template>
</template>
</div>
</template>

</div>
</template>
</template>
<!-- 配菜 end -->
<div  class="food-remark"  v-if="this.$ss.get('allowFoodRemark')">
  <div class="title-hasline">
    <div class="title-hasline_line _mbg"></div>
    <div class="title-hasline_text _c2">{{$t('备注')}}</div>
  </div>
  <input  class="food-remark _bg7 _c1" maxlength="20" :placeholder="$t('请输入菜品备注')" v-model="composeFood.remark"/>
</div>

</div>
</div>

<!-- button start -->
<div class="model-button_placeholder"></div>
<div v-if="!quickHandle" class="model-button_wrap_canSwitch _bg2">
  <div class="model-button_left-text">
    <!--<span class="_c1">小计：</span>-->
    <div v-if="$parent.showSpecialPrice(composeFood)" class="food-info_curprice _mc" >
      <span class="info-curprice_prefix">{{''|s}}</span>
      <span v-if="$parent.showSpecialPrice(composeFood)" class="info-curprice_amount">
                        <span >{{totalSpecialPrice}}</span>
                        <span class="price_remove">
                       <span >{{''|s}}{{toFix(totalPrice)}}</span>
                       </span>
                  </span>
      <span  v-else class="info-curprice_amount">{{toFix(totalPrice)}}</span>
    </div>
    <div v-else class="food_price_wrap-bottom">
      <div class="food-info_curprice _mc">
        <span class="info-curprice_prefix">{{''|s}}</span>
        <span class="info-curprice_amount">{{toFix(totalPrice)}}</span>
      </div>
      <div class="food-info_vipwrap" v-if="showVipPrice">
        <!--                <div class="food-info_vipprice">
                          <div class="info-vipprice_text">{{$t('会员价')}}</div>
                          <span class="info-vipprice_prefix">{{''|s}}</span>
                          <span class="info-vipprice_amount">{{toFix(totalVipPrice)}}</span>
                          <span class="vip-triangle"></span>
                        </div>-->
        <VipPriceContent :vipPrice="toFix(totalVipPrice)"></VipPriceContent>
    </div>
  </div>
</div>
<div :class="['shopcart-button  model-button1  _mbg_jb _cb', {'_c3 _bg3': disableComposeFoodBtn}]" @click="onClickOk">{{disableComposeFoodBtnText}}</div>
</div>
<div  v-else  class="model-button_wrap _bg2">
  <div :class="['model-button _mbg_jb _cb', {'_c3 _bg3': disableComposeFoodBtn}]" @click="onClickOk">{{disableComposeFoodBtnText}}</div>
</div>
<!-- button end -->
</div>
</div>
<!-- 可选套餐子菜  口味规格等选择弹窗 start  modifid by QY-->
<div @click="closeChildWin(curGroup)" @touchmove.prevent class="cover" v-if="curGroup&&showChildWin">
<div @click.stop class="inner _bg2">
<div class="inner-scroll">
  <div @click="closeChildWin(curGroup)" class="info-name_close model-close">
  <SvgIcon :color="getSvgColor(5)" class="zi-win-close" height="0.32" name="menuDetailClose" width="0.32"></SvgIcon>
</div>
<div class="child-model-name _c1">{{ curGroup.foodSetDetails[curSubFoodIndex].foodName}}</div>
<div class="zicaiScroll" ref="zicaiScroll">
  <div>
    <template v-for="(item, index) in curGroup.foodSetDetails[curSubFoodIndex].foodTastes">
      <div :key="index" class="title-hasline">
      <div class="title-hasline_line _mbg"></div>
      <div v-if="item.type=='20'" class="title-hasline_text _c2">{{$ts(item.desc,'cookeGroup')}}</div>
      <div v-if="item.type=='30'" class="title-hasline_text _c2">{{$ts(item.desc,'tasteGroup')}}</div>
      <div class="title-hasline_text-desc _c2 _bc1" v-if="tasteCheckedTips(formatTasteNum(item))" v-html="tasteCheckedTips(formatTasteNum(item))"></div>
  </div>
  <div class="model-checklist_wrap">
    <div :class="['model-checklist_item _c1', {_mc: j.isChecked,  qh_bg: !j.isChecked}]" :key="'taste-'+idx" @click="chooseSubFoodTasteOption(index, idx)" v-for="(j, idx) in item.tasteOption">
    <span :class="['model-checklist_item-text zicai-taste-option', j.tasteGG||setZicaiMutualExclusion(curGroup.foodCategoryName+'~'+curGroup.foodSetDetails[curSubFoodIndex].foodName,item.desc,j.tasteValue && j.tasteValue.split('@')[0])?'_bg2 _mbg_disabled':'', {_mbg_checked: j.isChecked}]"
  >{{$ts(j.tasteValue && j.tasteValue.split('@')[0],'taste')}}</span>
  <div class="model-checklist_item-dot model-checklist_item-dot-gg" v-if="j.tasteGG">{{$t('售罄')}}</div>
  <div class="model-checklist_item-dot" v-else-if="showAddPrice(j)">+{{'' | s}}{{getValue(j)}}</div>

</div>
</div>
</template>
<!--这一段的逻辑只有一个作用，那就是口味必选是否选中-->
<template v-for="(selfDish,dishIndex) in curGroup.foodSetDetails[curSubFoodIndex].sideDishGroups" >
  <template v-if="showSideDish(selfDish)">
    <div class="title-hasline">
      <div class="title-hasline_line _mbg"></div>
      <div class="title-hasline_text _c2">{{selfDish.groupName}}</div>
      <div class="title-hasline_text-desc _c2 _bc1" v-if="tasteCheckedTips(getSideDishTip(curGroup.foodSetDetails[curSubFoodIndex],dishIndex))"  v-html="tasteCheckedTips(getSideDishTip(curGroup.foodSetDetails[curSubFoodIndex],dishIndex))">
      </div>
    </div>
    <div>
      <template>
        <template v-for="(item, itemIndex) in selfDish.sideDishes">
          <template v-for="(unit, unitIndex) in item.units">
            <div :key="`${itemIndex}-${unitIndex}`" class="small-food" v-show ="shopSetting.showSellOutFood|| !sideSoldOut(item)">
            <div class="small-food_left">
              <div class="small-food_img border">
                <img alt  :src="changeSize(menuImages[item.foodName],1.2,1.2,true)"  class="small-food_img" v-if="menuImages[item.foodName]"/>
              <img alt  class="small-food_img" src="../../../assets/images/default_menu_bg_w.png" v-else/>
            </div>
            <div class="small-food_info">
              <div class="small-food_foodname _c1">{{$parent.foodDisplayName(item)}}
                <span class="food-name-unit _c3">/{{$ts(item.units[0].unit,'unit')}}</span>
              </div>
              <div class="small-food_price-wrap">
                <div class="small-food_price set-children-dish  _c1" v-if="unit.price>=0">
                  <span class="small-food_amount-prefix">{{"" | s}}</span>
                  <span class="small-food_amount">{{unit.price}}</span>
                </div>
                <div class="food-info_vipwrap" style="margin-bottom: 0" v-if="unit.vipPrice < unit.price" v-show="menuDecorate && menuDecorate.displayVipPrice == 1">
                  <VipPriceContent :vipPrice="unit.vipPrice"></VipPriceContent>
              </div>
            </div>
    </div>
  </div>
  <div class="small-food_right _c1">
    <span v-if="notGoodTime(item)" class="food-button_capsule">{{$t('非可售时间')}}</span>
    <span v-else-if="sideSoldOut(item)" class="food-button_capsule">{{ $t(shopSetting.sellOutFoodComment) }}</span>
    <span class="food-button" v-else>
                              <p @click="onClickRemoveSideDishFromFood(curGroup.foodSetDetails[curSubFoodIndex],itemIndex, unitIndex,dishIndex)" class="hll-comp-minus _mb" v-show="unit.count">
                                <span class="menu-btn_svg minus _mbg_jb"></span>
                              </p>
    <span class="food-counter _c1" v-show="unit.count">{{unit.count}}</span>
    <p :class="['hll-comp-plus _mbg_jb', {_bg3: disableSideDishBtn(curGroup.foodSetDetails[curSubFoodIndex],selfDish,dishIndex,itemIndex) || setZicaiMutualExclusion(curGroup.foodCategoryName+'~'+curGroup.foodSetDetails[curSubFoodIndex].foodName,selfDish.groupName,item.foodName)}]"
    @click="onClickAddSetToFood(curGroup.foodSetDetails[curSubFoodIndex],itemIndex, unitIndex,dishIndex)">
    <span class="menu-btn_svg plus-across _bg4"></span>
    <span class="menu-btn_svg plus-vertical _bg4"></span>
  </p>
</span>
</div>
</div>
</template>
</template>
</template>
</div>
</template>
</template>
</div>
</div>
<div class="inner-button">
  <div :class="['model-btn','model-button','_mbg_jb ',  disabledChildTasteBtn(curGroup.foodSetDetails[curSubFoodIndex])?'_bg3 _c3':'_cb']"
  @click="onClickSetmealOptionPlusBtn(curGroupIndex, curSubFoodIndex,{ok:true,showChildWin:false,disabled:!curGroup.foodSetDetails[curSubFoodIndex].foodTastes.
                  filter(v=>v.required).every(item=>item.tasteOption.some(v=>v.isChecked))})"
>{{$t('选好了')}}</div>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
  /* eslint-disable */
  import BScroll from 'better-scroll';
  import SvgIcon from '../../../components/SvgIcon';
  import { utils } from '../../../helpers';
  import MessageBox from '../../../components/MessageBox';


  const list2map = (data, keys) =>
  data.reduce((map, target) => {
  const key = keys.map(item => target[item]).join('_');
  map[key] = target;
  return map;
}, {});
  const { colorRgb, changeSize, deepCopy, toFix } = utils;
  export default {
  data() {
  return {
  showSubFoodModal: false,
  tempPinpan: [],
  sideDishmin: 0,
  sideDishmax: 0,
  curGroup: {},
  curGroupIndex: 0,
  curGroupBck:{},
  curSubFoodIndex: 0,
  showChildWin: false,
  //固定
  foodSetDisplay:this.menuDecorate.foodSetDisplay,
  // foodSetDisplay:3,
  excludeGroups:[],
  zicaiExcludeGroups:{},
  zicaiExcludeGroupsBck:{},
  excludeGroupsSideGroup:{}
};
},
  components: { SvgIcon},
  props: ['composeFood', 'showSetFood', 'chooseFoodCount', 'menuImages', 'foodStocks','shopcart','shopSetting','editFoodInCart','menuDecorate','disabledTastesMap','foodSaleTimes'],
  methods: {
  toFix,
  changeSize,
  colorRgb,
  sideDishChooseCount() {
  let sideDishCount=[];
  sideDishCount=this.composeFood.sideDishGroups.map(item=>{
  return item.sideDishes.reduce((number, target) => number + target.units.reduce((unitsCount, target) => unitsCount + (target.count || 0), 0), 0);
})
  return Math.max(...sideDishCount);
},
  //非普通菜（弹窗型加菜），有口味||规格||做法   但是不包含配菜的普通菜（非套餐），you配餐的还按照以前的处理
  quickHandleMinus(food, event) {
  if(this.quickMinusDisabled) return
  this.composeFood.count--;
},
  quickHandlePlus() {
  if (this.composeFood.minOrderCount && this.composeFood.count <= this.composeFood.minOrderCount&&!this.isFillMinOrder()) {
  this.composeFood.count = this.composeFood.minOrderCount;
}
  this.composeFood.count++;
},
  isFillMinOrder(){
  const foodNum=this.shopcart.reduce((foodNum,food)=>{
  if(food.foodName===this.composeFood.foodName){
  return foodNum+food.count
}
  return foodNum;
},0)
  return (foodNum-this.composeFood.minOrderCount)>=0
},
  closeChildWin(group,optionIndex) {
  if(typeof optionIndex==='number') {
  this.curGroup=group;
  this.curSubFoodIndex=optionIndex;
}
  this.showChildWin = false;
  const foodName=this.curGroup.foodCategoryName+'~'+this.curGroup.foodSetDetails[this.curSubFoodIndex].foodName;
  let count=this.curGroup.foodSetDetails[this.curSubFoodIndex].count
  this.curGroup = {};
  //如果该子菜数点的数目为0 则置空
  // if(!group.count){
  if(!count){
  this.zicaiExcludeGroups= Object.assign({},this.zicaiExcludeGroups,{[foodName]:JSON.parse(JSON.stringify(this.zicaiExcludeGroupsBck[foodName]))})
}
},
  isSoldOut(detail) {
  return this.foodStocks[`${detail.foodName}_${detail.unit}`] === 0;
},
  isEnough(group, groupIndex) {
  let zicai = this.composeFood.foodSetCategories[groupIndex];
  if (zicai && zicai.canSwitch !== '0') {
  //怎么会有请选择0分的套餐呢，商家你是怎么想的？
  return !zicai.chooseCount || zicai.count >= zicai.chooseCount;
}
},
  getValue(item) {
  const str = item.tasteValue.split('@')[1];
  if (str.indexOf('G') !== -1) return str.replace('G', '');
  if (str.indexOf('S') !== -1) return str.replace('S', '');
  if (str.indexOf('R') !== -1) return str.replace('R', '');
  return str;
},
  showAddPrice(item) {
  if (!item.tasteValue) return;
  return item.tasteValue.indexOf('@') !== -1;
},
  showGdDIY(group){
  return group.canSwitch==='0'&&(group?.foodSetDetails??[]).reduce((vv,v)=>vv+v.foodTastes.length+v.sideDishGroups.length,0)
},
  showGdDIYSelf(item){
  return (item.foodTastes.length+item.sideDishGroups.length)
},
  /** 子菜框 */
  getSelectedTaste(teste) {
  return teste
  .reduce((arr, target) => arr.concat(target.tasteOption), [])
  .filter(item => (item.isChecked === undefined ? item.check : item.isChecked))
  .map(item => item.tasteValue.split('@')[0])
  .join(',');
},
  changeZicaiHuchi(foodName,composeName,type){
  let zicaiExcludeGroup=this.zicaiExcludeGroups[foodName]||[];
  for(let i=0;i<zicaiExcludeGroup.length;i++){
  let group=zicaiExcludeGroup[i];
  if(Object.keys(group).includes(composeName)){
  if(type){
  group[composeName]-=1
  if(group[composeName]<0) group[composeName]=0
}else{
  group[composeName]+=1;
}
}
  this.zicaiExcludeGroups=Object.assign({},this.zicaiExcludeGroups,{[foodName]:zicaiExcludeGroup})
}
},
  //子菜口味做法选择
  chooseSubFoodTasteOption(groupIndex, optionIndex) {
  const foodName=this.curGroup.foodSetDetails[this.curSubFoodIndex].foodName;
  const cat_foodName=this.curGroup.foodCategoryName+'~'+foodName
  const tastes = this.curGroup.foodSetDetails[this.curSubFoodIndex].foodTastes;
  const group = deepCopy(tastes[groupIndex]);
  const tasteOption=group.tasteOption[optionIndex]
  let selectState=this.formatTasteNum(group);
  if(selectState.yixuan===selectState.max  && selectState.yixuan && group.multi  && !tasteOption.isChecked){
  this.toast({text:`${$t('至多可选择')}${selectState.max}${$t('份')}`})
  if(!tasteOption.isChecked) return
}
  if(tasteOption.tasteGG||this.setZicaiMutualExclusion(cat_foodName,group.desc,tasteOption.tasteValue.split('@')[0]))return
  tasteOption.isChecked = !tasteOption.isChecked;

  if (!group.multi) {
  group.tasteOption
  .filter((a, b) => b !== optionIndex)
  .forEach(c => {
  c.isChecked = false;
});
}
  // if (!group.tasteOption[optionIndex].isChecked && group.required && group.tasteOption.every(option => !option.isChecked)) return;
  this.changeZicaiHuchi(cat_foodName,(group.desc+'~'+group.tasteOption[optionIndex].tasteValue.split('@')[0]),!group.tasteOption[optionIndex].isChecked)
  if (!group.multi) {
  // if(!group.required)return
  group.tasteOption
  .filter((a, b) => b !== optionIndex)
  .forEach(c => {
  this.changeZicaiHuchi(cat_foodName,(group.desc+'~'+c.tasteValue.split('@')[0]),'minus')
});
}

  this.$set(this.curGroup.foodSetDetails[this.curSubFoodIndex].foodTastes, groupIndex, group);
},

  // 选择子菜口味做法
  chooseSubFoodTaste(group, groupIndex, optionIndex,showChildWin) {
  // group=this.composeFood
  let notSold = [];
  let sold = [];
  let count = group.foodSetDetails[optionIndex].count;
  group.foodSetDetails = group.foodSetDetails.map(detail => {
  if (this.foodStocks[`${detail.foodName}_${detail.unit}`] === 0) {
  sold.push(detail);
} else {
  notSold.push(detail);
}
  return detail;
});
  if (!count) {
  //如果是第一次打开或者该子菜的数量为0时，应该重置初始条件，其他的时候不必。
  group.foodSetDetails.forEach((i, index) => {
  if (index !== optionIndex) {
  return;
}
  i.foodTastes.forEach(j => {
  j.tasteOption.forEach(k => {
  k.isChecked = k.check&&!k.tasteGG;
});
});
  i.sideDishGroups.forEach(sdg=>{
  sdg.sideDishes.forEach(sd=>{
  sd.units[0].count=sd.defaultSelects?1:0;
})
})
});
}
  this.curGroup = group;
  this.curGroupIndex = groupIndex;
  // this.showSubFoodModal = true;
  // this.curSubFoodIndex=optionIndex;
  this.curSubFoodIndex = optionIndex || 0;
  if(group.canSwitch==='0'){
  this.showChildWin=showChildWin.showChildWin;
}else{
  this.showChildWin = true;
}
  this.showChildWin&&this.$nextTick(() => {
  this.inviteScroll = new BScroll(this.$refs.zicaiScroll, { click: true, bounce: false });
});
},

  /** 子菜框 结束 */

  onClickOk() {
  if (this.disableComposeFoodBtn) return;
  // if (this.correctTheCount()) return;
  const composeFood = this.composeFood;

  const stock = this.foodStocks[`${composeFood.foodName}_${composeFood.unit}`];

  if (this.chooseCount(composeFood) + composeFood.count > stock) {
  MessageBox.alert($t('当前库存不足'), $t('提示'));
  return;
}

  // 口味做法
  composeFood.foodTastes = (composeFood.foodTastes || [])
  .filter(taste => taste.tasteOption.filter(option => option.isChecked).length)
  .map(taste => {
  const checkedTaste = taste.tasteOption.filter(option => option.isChecked);
  const key = taste.desc;
  const type = taste.type;
  const value = checkedTaste.map(option => option.tasteValue);
  return { key, value, type };
});

  // 子菜口味做法
  (composeFood.foodSetCategories || []).forEach(i => {
  i.foodSetDetails.forEach(j => {
  j.foodTastes = (j.foodTastes || [])
  .filter(taste => taste.tasteOption.filter(option => option.isChecked).length)
  .map(taste => {
  const checkedTaste = taste.tasteOption.filter(option => option.isChecked);
  const key = taste.desc;
  const type = taste.type;
  const value = checkedTaste.map(option => option.tasteValue);
  return { key, value, type };
});
});
});

  // 已选套餐
  composeFood.foodSetCategories = (composeFood.foodSetCategories || []).map(foodSet => {
  foodSet.foodSetDetails = foodSet.foodSetDetails.filter(detail => {
  detail.count = toFix(detail.count * detail.number);
  detail.count&&(detail.sideDishGroups=detail.sideDishGroups.filter(sdg=>{
  let flag= sdg.sideDishes.some(sd=>sd.units[0].count)
  flag && (sdg.sideDishes=sdg.sideDishes.filter(sd=>sd.units[0].count))
  return flag
}))//.forEach(sdg=>sdg=>sdg.sideDishes=sdg.sideDishes.filter(sd=>sd.unit[0].count))
  return detail.count;
});
  return foodSet;
});
  composeFood.foodSetCategories=  (composeFood.foodSetCategories || []).filter(foodSet=>{
  if(foodSet.canSwitch==='1'){
  return foodSet.chooseCount!==0
}
  return true
}
  )
  // 配菜
  composeFood.sideDishes = composeFood.sideDishGroups.reduce((arr,group)=>{
  return arr.concat(group.sideDishes.reduce((arr, target) => arr.concat(target.units.map(unit => ({ ...target, ...unit }))), []).filter(item => item.count));
},[])
  this.$emit('setFoodCloseBtnHandler');
  if (composeFood.isEditFoodFront) {
  this.$emit('editFoodHandler',composeFood)
  return;
}
  this.$emit('addFoodHandler', composeFood, this.$parent.plusEvent);
},
  changeHuchi(group,composeName,type){
  for(let i=0;i<this.excludeGroups.length;i++){
  let group=this.excludeGroups[i];
  if(Object.keys(group).includes(composeName)){
  if(type){
  group[composeName]-=1
  if(group[composeName]<0) group[composeName]=0
}else{
  group[composeName]+=1;
}
}
}
  let temp={20:'做法组',30:'口味组'}
  let groupType=temp[group.type] || '配菜组'
  let groupName=groupType+'_'+composeName.split('~')[0]

  let sideDishGroupCount=this.excludeGroupsSideGroup[groupName];
  if(typeof sideDishGroupCount !=='undefined') {
  if(type){
  this.excludeGroupsSideGroup[groupName]--
  if(this.excludeGroupsSideGroup[groupName]<0) this.excludeGroupsSideGroup[groupName]=0
}else{
  this.excludeGroupsSideGroup[groupName]++;
}
}
},
  onClickRemoveSideDishFromCart(itemIndex, unitIndex,dishIndex) {
  const unit = this.composeFood.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex];
  if (unit.count === 0) return;

  this.$set(this.composeFood.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex], 'count', unit.count - 1);



  const sideDishGroup=this.composeFood.sideDishGroups[dishIndex];
  const sideDish=sideDishGroup.sideDishes[itemIndex]
  this.changeHuchi(sideDishGroup,sideDishGroup.groupName+'~'+sideDish.foodName,1)

},
  onClickAddSideDishToCart(itemIndex, unitIndex,dishIndex) {
  const sideDishGroup=this.composeFood.sideDishGroups[dishIndex];
  const sideDish=sideDishGroup.sideDishes[itemIndex]
  if(this.sideSoldOut(sideDish)) return;
  if (this.disableSideDishBtn(this.composeFood,this.composeFood.sideDishGroups[dishIndex],dishIndex,itemIndex) || this.setMutualExclusion(sideDishGroup,sideDish.foodName)) return;
  const unit = sideDish.units[unitIndex];
  const count = (unit.count || 0) + 1;
  this.$set(this.composeFood.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex], 'count', count);
  this.changeHuchi(sideDishGroup,sideDishGroup.groupName+'~'+sideDish.foodName)
},
  onClickRemoveSideDishFromFood(food,itemIndex, unitIndex,dishIndex) {
  const unit = food.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex];
  if (unit.count === 0) return;
  this.$set(food.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex], 'count', unit.count - 1);
  const sideDishGroup=food.sideDishGroups[dishIndex];
  const sideDish=sideDishGroup.sideDishes[itemIndex]
  let setGroup_food_name=this.curGroup.foodCategoryName+'~'+food.foodName;
  this.changeZicaiHuchi(setGroup_food_name,sideDishGroup.groupName+'~'+sideDish.foodName ,1)
},
  onClickAddSetToFood(food,itemIndex, unitIndex,dishIndex,foodSet) {
  const sideDishGroup=food.sideDishGroups[dishIndex];
  const sideDish=sideDishGroup.sideDishes[itemIndex]
  let setGroup_food_name=(this.curGroup.foodCategoryName??foodSet?.foodCategoryName)+'~'+food.foodName;
  if(this.sideSoldOut(sideDish)) return;
  if (this.disableSideDishBtn(food,sideDishGroup,dishIndex,itemIndex) || this.setZicaiMutualExclusion(setGroup_food_name,sideDishGroup.groupName,sideDish.foodName)) return;
  const unit = sideDish.units[unitIndex];
  const count = (unit.count || 0) + 1;
  this.$set(food.sideDishGroups[dishIndex].sideDishes[itemIndex].units[unitIndex], 'count', count);
  this.changeZicaiHuchi(setGroup_food_name,sideDishGroup.groupName+'~'+sideDish.foodName)
},
  chooseUnit(idx) {
  const cu = this.composeFood.units[idx];
  this.composeFood.units = this.composeFood.units.map(item => ({ ...item, isChecked: false }));
  this.composeFood.units[idx].isChecked = true;
  Object.keys(cu).forEach(item => {
  this.composeFood[item] = cu[item];
});
  if(typeof cu.specialPrice === 'undefined'){
  this.composeFood.specialPrice=undefined;
}
},
  onClickSetFoodCloseBtn() {
  this.$emit('setFoodCloseBtnHandler');
},
  onClickSetmealOptionMinusBtn(groupIndex, optionIndex) {
  const group = this.composeFood.foodSetCategories[groupIndex];

  if (group.foodSetDetails[optionIndex].count === 0) return;
  if (group.count === 0) return;

  // decrement already choose count
  group.count -= 1;
  group.foodSetDetails[optionIndex].count = group.foodSetDetails[optionIndex].count - 1;
  this.$set(this.composeFood.foodSetCategories, groupIndex, group);
  this.closeChildWin(group,optionIndex);
  if (this.composeFood.pinpan) {
  const { foodName, unit } = group.foodSetDetails[optionIndex];
  const itemIndex = this.tempPinpan.findIndex(item => item === `${foodName}${unit}`);
  this.tempPinpan.splice(itemIndex, 1);
}
  this.removeFoodSetPrice(groupIndex, optionIndex);
},
  // 弹层内容区的套餐分组菜品 + 按钮
  onClickSetmealOptionPlusBtn(groupIndex, optionIndex, option) {
  if (option.isSoldOut || option.disabled) return;
  let group = this.composeFood.foodSetCategories[groupIndex];
  group=deepCopy(group);
  if(group.canSwitch==='0' && option.showChildWin){
  this.chooseSubFoodTaste(group, groupIndex, optionIndex,option);
  return
}
  // initial or increment group already choose count
  const item=group.foodSetDetails&&group.foodSetDetails[optionIndex]
  if(!option.showChildWin){
  if(JSON.stringify(this.curGroup)!=='{}'){
  if(this.disabledChildTasteBtn(this.curGroup.foodSetDetails&&this.curGroup.foodSetDetails[optionIndex]))return
}else{
  if(this.disabledChildTasteBtn(item)) return
}
}

  if(item&&group.canSwitch==='1'&&this.zicaiCanPlus(group,item,groupIndex)) return;


  group.count = group.count || 0;

  const foodName=group.foodSetDetails[optionIndex].foodName

  // if (group.count >= group.chooseCount) return;
  if (option.showChildWin && group.foodSetDetails && group.foodSetDetails[optionIndex].foodTastes && (group.foodSetDetails[optionIndex].sideDishGroups.length || group.foodSetDetails[optionIndex].foodTastes.length)) {
  this.chooseSubFoodTaste(group, groupIndex, optionIndex);
  return false;
} else {
  // this.curGroup = {};
  if(JSON.stringify(this.curGroup)!=='{}'){
  group=deepCopy(this.curGroup);
}
  this.curGroup = {};
  option.showChildWin = false;
}

  //此处之前是打开弹窗初始化的逻辑
  //这之后就是加菜的逻辑了。
  if(group.canSwitch!=='0'){
  group.count = group.count + 1;
  group.foodSetDetails[optionIndex].count = (group.foodSetDetails[optionIndex].count || 0) + 1;
}
  this.$set(this.composeFood.foodSetCategories, groupIndex, group);
  // this.$set(this.composeFood.foodSetCategories, groupIndex, this.curGroup);
  this.addFoodSetPrice(groupIndex, optionIndex);
  if (option) {
  this.showChildWin = option.showChildWin;
}
},
  getSideDishTip(food,dishIndex) {
  // let selfDish=this.composeFood.sideDishGroups[dishIndex]
  let selfDish=food.sideDishGroups[dishIndex]
  let [min = 0, max = 0] = (selfDish.supportFood || '').split('-').filter(item => item);
  const count = this.getSideDishesCount(food,dishIndex);
  min=+min;
  max=+max;
  return  {
  kexuan:max >= 99?'': `${min}~${max}`+$t('份'),
  xuxuan:min===max?min:0,
  yixuan:count,
  atLeast:max >= 99?min:0,
  max,
  min
};
},
  formatTasteNum(taste){
  let tasteNumRange=taste.tasteNumRange;
  let [min = 0, max = 0] = (tasteNumRange || '').split('-').filter(item => item);
  const count = taste.tasteOption.filter(item=>item.isChecked).length;
  min=+min;
  max=+max;
  return  {
  kexuan:max >= 99?'': `${min}~${max}`+$t('份'),
  xuxuan:min===max?min:0,
  yixuan:count,
  atLeast:max >= 99?min:0,
  max,
  min
};
},
  tasteCheckedTips(state){
  // let  state = this.formatTasteNum(taste);
  let html=[];
  if(state.atLeast){
  html.push(`<span class="can-select">${$t('至少选择')}${state.atLeast || 0 }${$t('份')}</span>`)
  state.yixuan<state.atLeast &&  html.push(`<span class="has-select">${ $t('还差\n')}${state.atLeast - (state.yixuan || 0)}${$t('份')}</span>`);
}else if(state.xuxuan){
  if(state.xuxuan - state.yixuan||0){
  html.push(`<span class="can-select">${$t('需选择')} ${state.xuxuan || 0 } ${$t('份')}</span>
                 <span class="has-select">${ $t('还差\n')}${state.xuxuan - state.yixuan || 0} ${$t('份')}</span>`);
}else{
  html.push(`<span class="can-select">${$t('已选择')} ${state.yixuan || 0 } ${$t('份')}</span>`)
}
}else{
  state.kexuan&& html.push(`<span class="can-select">${$t('可选')}${state.kexuan}</span>`)
  state.yixuan && html.push(`<span class="${state.kexuan && (state.min>state.yixuan) ?'has-select':'can-select2'}">${$t('已选')} ${state.yixuan || 0} ${$t('份')}</span>`);
}
  return html.join(' ');
},
  // 弹层内容区的 spec 规格选项
  onClickSpecItem(groupIndex, optionIndex) {
  const group = deepCopy(this.composeFood.foodTastes[groupIndex]);
  let oldChecked=null;
  if (!group.multi) {
  oldChecked= group.tasteOption.find(v=>v.isChecked)
}
  const tasteOption=group.tasteOption[optionIndex];

  let selectState=this.formatTasteNum(group);
  if(selectState.yixuan===selectState.max  && selectState.yixuan && group.multi  && !tasteOption.isChecked){
  this.toast({text:`${$t('至多可选择')}${selectState.max}${$t('份')}`})
  if(!tasteOption.isChecked) return
}

  if(tasteOption.tasteGG||this.setMutualExclusion(group,tasteOption.tasteValue.split('@')[0]))return


  tasteOption.isChecked = !tasteOption.isChecked;

  if (!group.multi) {
  group.tasteOption
  .filter((a, b) => b !== optionIndex)
  .forEach(c => {
  c.isChecked = false;
});
}
  // if (!tasteOption.isChecked && group.required && group.tasteOption.every(option => !option.isChecked)) return;

  //  取消选中的时候，取消对应的互斥
  this.changeHuchi(group,(group.desc+'~'+tasteOption.tasteValue.split('@')[0]),!tasteOption.isChecked)
  if (!group.multi) {
  if(oldChecked){
  this.changeHuchi(group,(group.desc+'~'+oldChecked.tasteValue.split('@')[0]),'minus')
}
}
  this.$set(this.composeFood.foodTastes, groupIndex, group);

  // TODO: 口味做法交互优化
  this.composeFood.foodTastes
  .map(i => {
  return i.tasteOption
  .filter(r => r.isChecked)
  .reduce((price, j) => {
  const str = j.tasteValue
  .split('@')
  .slice(1)
  .find(a => a[0] === 'S' || a[0] === 'G');
  const p = (str || '').replace(/[^\d\.]/g, '') || 0;
  return Number(p) + Number(price);
}, 0);
})
  .reduce((n, n1) => n + n1, 0);
},
  chooseCount(food) {
  return this.chooseFoodCount[`${food.foodName}_${food.unit}`] || 0;
},
  showSideDish(food = {}) {
  if (!(food.sideDishes || []).length) return false;
  const [min = 0, max = 0] = (food.supportFood || '').split('-').filter(item => item);
  const items = [max > 0];
  return items.every(item => item);
},
  getSpecOptionTip(group) {
  const sel = group.required ? $t('必选') : $t('非必选');
  const mul = group.multi ? $t('多选') : $t('单选');
  return `${mul} , ${sel}`;
},
  getSideDishesCount(food,dishIndex) {
  // return  this.composeFood.sideDishGroups[dishIndex].sideDishes.reduce((number, target) => number + target.units.reduce((unitsCount, target) => unitsCount + (target.count || 0), 0), 0);
  return  food.sideDishGroups[dishIndex].sideDishes.reduce((number, target) => number + target.units.reduce((unitsCount, target) => unitsCount + (target.count || 0), 0), 0);
},
  setMaxWidth(hotTag) {
  const sizeMap = { 1: '5.6rem', 2: '5.4rem', 3: '5.2rem' };
  return sizeMap[Number(hotTag)];
},
  /**
   * 计算可选套餐加价
   */
  removeFoodSetPrice(gidx, oidx) {
  const price = this.getPrice(gidx, oidx);
  this.changePrice(-price);
},
  addFoodSetPrice(gidx, oidx) {
  const price = this.getPrice(gidx, oidx);
  this.changePrice(price);
},
  getPrice(groupIndex, optionIndex) {
  const foodDetail = this.composeFood.foodSetCategories[groupIndex].foodSetDetails[optionIndex];
  return toFix((foodDetail.addPrice || 0) * (foodDetail.number || 0));
},
  changePrice(price) {
  if(this.composeFood.specialPrice || this.composeFood.specialPrice===0) this.composeFood.specialPrice=toFix(this.composeFood.specialPrice + price)
  this.composeFood.price = toFix(this.composeFood.price + price);
  this.composeFood.vipPrice = toFix(this.composeFood.vipPrice + price);
  this.composeFood.originalPrice = toFix(this.composeFood.originalPrice + price);
},
  sideGroupsHuchi(group){
  // groupName=group.
  let temp={20:'做法组',30:'口味组'}
  let groupType=temp[group.type] || '配菜组'
  const groupName=groupType+'_'+(group.desc||group.groupName)
  let  a=Object.values(this.excludeGroupsSideGroup).find(v=>v>0)
  let b=Object.entries(this.excludeGroupsSideGroup).reduce((prev,item)=>prev.concat(!item[1]?item[0]:[]),[])
  let flagSide=false;
  if(a){
  for (let [key,value] of Object.entries(this.excludeGroupsSideGroup)){
  if(value===0){
  flagSide=b.includes(groupName)
}
}
}
  return flagSide
},
  init(){
  let food=this.composeFood;
  this.composeFood && this.composeFood.foodTastes.forEach(v => (v.tasteOption = v.tasteOption.map(item => {
  if(this.disabledTastesMap.includes(`${v.type}_${item.tasteValue &&item.tasteValue.split('@')[0]}`)) item.tasteGG=true;
  //这个吧，如果分组互斥加上每个分组默认选中，这种傻逼设置出现的时候，把下面这句话1  去掉就好了，这样默认选中第一个分组内的菜
  let temp=1|| this.sideGroupsHuchi(v );
  if(item.check&& !item.tasteGG&&temp){
  this.changeHuchi(v,v.desc+'~'+(item.tasteValue && item.tasteValue.split('@')[0]))
}
  return   { ...item, isChecked: item.check&&!item.tasteGG&&temp }
}
  )));

  this.composeFood.foodSetCategories.forEach(i => {
  i.foodSetDetails.forEach(j => {
  j.foodTastes.forEach(k => {
  k.tasteOption = k.tasteOption.map(item => {
  if(this.disabledTastesMap.includes(`${k.type}_${item.tasteValue &&item.tasteValue.split('@')[0]}`)) item.tasteGG=true;
  if(item.check&&!item.tasteGG){
  this.changeZicaiHuchi(i.foodCategoryName+'~'+j.foodName,k.desc+'~'+(item.tasteValue && item.tasteValue.split('@')[0]))
}
  return { ...item, isChecked: item.check&&!item.tasteGG }
});
});
  j.sideDishGroups.forEach((sdg,sdgIndex)=>{
  sdg.sideDishes.forEach((sd,sdIndex) => {
  if (sd.defaultSelects) {
  for (let key = 0; key < sd.defaultSelects; key++) {
  this.onClickAddSetToFood(j,sdIndex,0,sdgIndex,i);
}
}
})
})
});
});
  this.zicaiExcludeGroupsBck=JSON.parse(JSON.stringify(this.zicaiExcludeGroups));
  this.composeFood.units = food.units.map((item, i) => {
  if (item.isChecked) {
  this.chooseUnit(i);
}
  return { ...item, isChecked: item.isChecked };
});
  try {
  this.composeFood.foodSetCategories.map((v, i) => {
  if (v.canSwitch === '1') {
  v.foodSetDetails.map((key, index) => {
  if (key.defaultSelect && !(this.foodStocks[`${key.foodName}_${key.unit}`] === 0)) {
  let canntAdd = this.disabledChildTasteBtn(key);
  // let canntAdd=key.foodTastes.find(taste=>taste.required&&taste.tasteOption.every(op=>op.tasteGG))
  !canntAdd&&this.onClickSetmealOptionPlusBtn(i, index, { isSoldOut: this.isSoldOut(key) });
}
});
}
});
} catch (e) {}

  try {
  this.composeFood.sideDishGroups.forEach((item,dishIndex)=> {
  item.sideDishes.map((v, i) => {
  if (v.defaultSelects) {
  // this.changeHuchi(item.groupName+'~'+v.foodName)
  for (let key = 0; key < v.defaultSelects; key++) {
  this.onClickAddSideDishToCart(i, 0,dishIndex);
}
}
})
})

} catch (e) {}
  if (!food || !food.foodTastes || !food.foodTastes.length) return;
},
  editFood(){
  let food=this.composeFood;
  this.zicaiExcludeGroupsBck=JSON.parse(JSON.stringify(this.zicaiExcludeGroups));
  food.isEditFoodFront=1;
  let {foodTastes,sideDishes,foodSetCategories,count,chooseCount,unit,unitKey,price,vipPrice,specialPrice,isPerson} =this.editFoodInCart;
  foodTastes=this.editFoodInCart.foodTastes || [];
  sideDishes=this.editFoodInCart.sideDishes || [];
  foodSetCategories=this.editFoodInCart.foodSetCategories || [];
  let setDishGroups={};
  foodSetCategories.forEach(v=>{
  v.foodSetDetails.forEach(i=>{
  i.sideDishGroups.forEach(j=>{
  j.sideDishes.forEach(h=>{
  setDishGroups[v.foodCategoryName+'~'+i.foodName+'~'+j.groupName+'~'+h.foodName]=h.units[0]?.count||0;
})
})
})
})
  this.$set(this.composeFood,'count',count)
  this.$set(this.composeFood,'chooseCount',chooseCount)
  this.$set(this.composeFood,'unitKey',unitKey)
  this.$set(this.composeFood,'unit',unit)
  this.$set(this.composeFood,'isPerson',isPerson)
  this.$set(this.composeFood,'price',+price)
  if(vipPrice){
  this.$set(this.composeFood,'vipPrice',+vipPrice)
}
  if(specialPrice|| (specialPrice===0)){
  this.$set(this.composeFood,'specialPrice',+specialPrice)
}
  sideDishes = list2map(sideDishes, ['unitKey']);
  foodSetCategories = list2map(foodSetCategories, ['foodCategoryName']);
  if(foodTastes){
  this.composeFood && this.composeFood.foodTastes.forEach(v => {
  let temp= (foodTastes.find(cf=>cf.key===v.desc) || {value:[]}).value
  v.tasteOption = v.tasteOption.map(item => {
  if(this.disabledTastesMap.includes(`${v.type}_${item.tasteValue &&item.tasteValue.split('@')[0]}`)) item.tasteGG=true;
  if(temp.includes(item.tasteValue)&& !item.tasteGG){
  this.changeHuchi(v,v.desc+'~'+(item.tasteValue && item.tasteValue.split('@')[0]))
}
  return { ...item, isChecked:temp.includes(item.tasteValue)&&!item.tasteGG }
})
});
}
  this.composeFood.foodSetCategories.forEach(i => {
  const tempCate=foodSetCategories[i.foodCategoryName];
  if(tempCate){ //说明这个分类有可选
  i.foodSetDetails.forEach(j => {
  let food= tempCate.foodSetDetails.find(item=>item.unitKey===j.unitKey)
  if(!food) return;
  j.count=toFix(food.count/j.number)
  j.foodTastes.forEach(k => {
  let temp= ((food.foodTastes||[]).find(cf=>cf.key===k.desc) || {value:[]}).value;
  k.tasteOption = (k.tasteOption||[]).map(item =>({ ...item, isChecked: temp.includes(item.tasteValue)}));
});
  j.sideDishGroups.forEach((sdg,sdgIndex)=>{
  sdg.sideDishes.forEach((sd,sdIndex) => {
  let count= setDishGroups[i.foodCategoryName+'~'+j.foodName+'~'+sdg.groupName+'~'+sd.foodName]
  if (count) {
  for (let key = 0; key < count; key++) {
  this.onClickAddSetToFood(j,sdIndex,0,sdgIndex,i);
}
}
})
})
});
  i.count=i.foodSetDetails.reduce((a,b)=>a+b.count,0);
}
  //再处理禁用，互斥
  i.foodSetDetails.forEach(j => {
  j.foodTastes.forEach((k) => {
  k.tasteOption = k.tasteOption.map((item) => {
  if(this.disabledTastesMap.includes(`${k.type}_${item.tasteValue &&item.tasteValue.split('@')[0]}`)) item.tasteGG=true;
  if(item.isChecked&&!item.tasteGG){
  this.changeZicaiHuchi(i.foodCategoryName+'~'+j.foodName,(k.desc+'~'+item.tasteValue.split('@')[0]),!item.isChecked)
}
  // return { ...item, isChecked: item.check }
  return item;
});
});
});
});
  food.units.forEach((item, i) => {
  item.isChecked=(item.unitKey===unitKey)
});
  try {
  this.composeFood.sideDishGroups.forEach((item,dishIndex)=> {
  item.sideDishes.map((v, i) => {
  if (sideDishes[v.units[0].unitKey]) {
  // v.units[0].count=sideDishes[v.units[0].unitKey].count-1
  for(let j=0;j<sideDishes[v.units[0].unitKey].count;j++){
  this.onClickAddSideDishToCart(i, 0,dishIndex);
}
}
})
})
} catch (e) {}
  if (!food || !food.foodTastes || !food.foodTastes.length) return;
},
  disabledChildTasteBtn(foodSet){
  let  flag=false;
  if (foodSet.sideDishGroups&& foodSet.sideDishGroups.length) {
  flag = !this.sideDishComplete_zicai(foodSet)
  // if(!this.sideDishComplete_zicai(foodSet)) return true
}
  return  flag ||  !foodSet.foodTastes.filter(v=>v.required).every(item=>{
  let  state = this.formatTasteNum(item);
  let disabled=false;
  if(state.yixuan<state.min){
  disabled=true;
}
  return !disabled
})
},
  sideDishComplete_zicai(food){
  let flag=true;
  food.sideDishGroups.forEach(item=>{
  const [min = 0, max = 0] = (item.supportFood || '').split('-').filter(item => item);
  const sideDishesCount=item.sideDishes.reduce((number, target) => number + target.units.reduce((unitsCount, target) => unitsCount + (target.count || 0), 0), 0);
  //如果是被互斥组互斥的，那么久跳过他
  if (sideDishesCount < min &&  !this.sideGroupsHuchi(item)) flag=false;
})
  return flag;
},
  initExcludeData(){
  this.excludeGroups = (this.composeFood.excludeGroups || []).map(item => (item.excludeDetails || []).reduce((a, b) => ({ ...(['配菜组', '口味组', '做法组'].includes(b.type) ? (c => {this.excludeGroupsSideGroup = Object.assign({}, this.excludeGroupsSideGroup, { [b.type + '_' + b.name]: 0 });return {};})(b) : b.excludes.reduce((p, c) => ({...p,[b.name + '~' + c]: 0}), {})), ...a}), {})).filter(a => Object.keys(a).length > 0);
  this.zicaiExcludeGroups=this.composeFood.foodSetCategories.reduce((prev,zicai)=>{
  // if(zicai.canSwitch!=='1') return prev;
  let b= zicai.foodSetDetails.reduce((zcPrev,zc)=>{
  let a=(zc.excludeGroups||[]).map(item=>(item.excludeDetails||[]).reduce((a,b)=>(['配菜组', '口味组', '做法组'].includes(b.type) ? (c => {this.excludeGroupsSideGroup = Object.assign({}, this.excludeGroupsSideGroup, { [b.type + '_' + b.name]: 0 });return {};})(b) :{...a,...(b.excludes.reduce((p, c) => ({...p,[b.name + '~' + c]:0}), {}))}),{}))
  return {...zcPrev,[zicai.foodCategoryName+'~'+zc.foodName]:a}
},{})
  return {...prev,...b}
},{})
  console.log('这里是   this.excludeGroups  ------------', this.excludeGroups);
  console.log('这里是   this.zicaiExcludeGroups  ------------', this.zicaiExcludeGroups);
  console.log('这里是   this.excludeGroupsSideGroup  ------------', this.excludeGroupsSideGroup);
},
  /*建议你不要关心此代码*/
  reflowUnit(){
  let func = (a, b) => b.price - a.price
  if(this.shopSetting.foodUnitsSortway == 2){
  func = (a, b) => this.composeFood.excellentSortWay.findIndex(v => v === a.unitKey) - this.composeFood.excellentSortWay.findIndex(v => v === b.unitKey)
}
  this.composeFood.units = this.composeFood.units.sort(func);
  const index = this.composeFood.units.findIndex(v => this.foodStocks[`${this.composeFood.foodName}_${v.unit}`] !== 0);
  if (index > -1) {
  this.composeFood.units = this.composeFood.units.map(item => ({ ...item, isChecked: false }));
  this.composeFood.units[index].isChecked = true;
  this.composeFood=Object.assign(this.composeFood,this.composeFood.units[index])
}
},
  notGoodTime(item){
  return  this.foodSaleTimes[item.foodID]
},
},
  computed: {
  promotion(){
  const pro = this.composeFood.foodPromotions || [];
  let prolist1=[];
  if (this.composeFood.customCategoryID === '-2') {
  prolist1=pro.filter(v => v.promotionType === 10)
}else{
  prolist1= pro.filter(v => v.promotionType === 3 || v.promotionType === 10)
}
  return {
  prolist1,
  prolist2: pro.filter(v => v.promotionType !== 3 && v.promotionType !== 10) || []
};
},
  getTastesPrice(){
  let personNum=1;
  return this.composeFood.foodSetCategories.reduce((fzp,fz)=>{
  return fzp+fz.foodSetDetails.reduce((sdp,sd)=>{
  if(sd.count===0){
  return sdp
}
  return sdp+sd.foodTastes.map(i => {
  return i.tasteOption
  .filter(r => r.isChecked)
  .reduce((price, j) => {
  personNum=1;
  // let count=1;
  let str = j.tasteValue.split('@').slice(1).find(a => ['S','G','R'].includes(a[0]));
  const p = (str || '').replace(/[^\d\.]/g, '') || 0;
  if( j.tasteValue.includes('@R')) {
  personNum=this.$ss.get('personNum')||1;
}
  if( j.tasteValue.includes('@S')) {
  // personNum=sd.count;
  //上面的才是对的，这是将错就错的玩意儿,购物车一个样子
  personNum=sd.count*sd.number;
}
  return toFix(Number(p)*personNum + Number(price));
}, 0);
}).reduce((n, n1) => n + n1, 0);
},0)
},0)
},

  showVipPrice(){
  return this.totalPrice>this.totalVipPrice&&this.composeFood.customCategoryID!=='-2'&&this.menuDecorate && this.menuDecorate.displayVipPrice == 1
},
  totalSpecialPrice(){
  return toFix(this.composeFood.specialPrice + this.foodTastesPrice+this.sideDishPrice +this.getTastesPrice+this.setSideDishPrice)
},
  totalPrice(){
  return toFix(this.composeFood.price + this.foodTastesPrice+this.sideDishPrice +this.getTastesPrice+this.setSideDishPrice)
},
  totalVipPrice(){
  return toFix(this.composeFood.vipPrice + this.foodTastesPrice+this.sideDishVipPrice+this.getTastesPrice+this.setSideDishVipPrice)
},
  foodTastesPrice() {
  let personNum=1;
  return this.composeFood.foodTastes
  .map(i => {
  return i.tasteOption
  .filter(r => r.isChecked)
  .reduce((price, j) => {
  personNum=1;
  let str = j.tasteValue.split('@').slice(1).find(a => ['S','G','R'].includes(a[0]));
  const p = (str || '').replace(/[^\d\.]/g, '') || 0;
  if( j.tasteValue.includes('@R')) {
  personNum=this.$ss.get('personNum')||1;
}
  return toFix(Number(p)*personNum + Number(price));
}, 0);
})
  .reduce((n, n1) => n + n1, 0);
},
  sideDishPrice() {
  return toFix(this.composeFood.sideDishGroups.reduce((prev,item)=>prev+item.sideDishes.reduce((number, dish) => number + dish.units.reduce((unitsCount, unit) => unitsCount + (unit.count * unit.price || 0), 0), 0),0))
},
  sideDishVipPrice(){
  return toFix(this.composeFood.sideDishGroups.reduce((prev,item)=>prev+item.sideDishes.reduce((number, dish) => number + dish.units.reduce((unitsCount, unit) => unitsCount + (unit.count * ((this.menuDecorate && this.menuDecorate.displayVipPrice == 1)?unit.vipPrice:unit.price) || 0), 0), 0),0))
},
  setSideDishPrice(){
  return toFix(this.composeFood.foodSetCategories.reduce((vv,v)=>vv+v.foodSetDetails.reduce((aa,a)=>aa+(a.count?(Number(a.batchingIsFoodNumberRate) === 1 ? a.number*a.count:1)*a.sideDishGroups.reduce((prev,item)=>prev+item.sideDishes.reduce((number, dish) => number + dish.units.reduce((unitsCount, unit) => unitsCount + (unit.count * unit.price || 0), 0), 0),0):0),0),0))
},
  setSideDishVipPrice(){
  return toFix(this.composeFood.foodSetCategories.reduce((vv,v)=>vv+v.foodSetDetails.reduce((aa,a)=>aa+(a.count?(Number(a.batchingIsFoodNumberRate) === 1 ? a.number*a.count:1)*a.sideDishGroups.reduce((prev,item)=>prev+item.sideDishes.reduce((number, dish) => number + dish.units.reduce((unitsCount, unit) => unitsCount + (unit.count * unit.vipPrice || 0), 0), 0),0):0),0),0))
},
  composeFoodHeadTip() {
  const { composeFood } = this;

  if (!composeFood.foodSetCategories || !composeFood.foodSetCategories.length) return '';

  return composeFood.foodSetCategories.filter(v => v.foodSetDetails && v.foodSetDetails.length).reduce((a, b) => `${a} ${b.foodCategoryName}:${b.foodSetDetails.length}选${b.chooseCount}<span style="padding: 0 5px"></span>`, '');
},
  sideSoldOut(){
  return (item)=>{
  return  this.foodStocks[`${item.foodName}_${item.units[0].unit}`] === 0
}
},
  disableSideDishBtn(){
  return (food,sideDishGroup,dishIndex,itemIndex)=> {
  let item=sideDishGroup.sideDishes[itemIndex];
  if(sideDishGroup.noRepeat&&item.units.length&&item.units[0].count>=1) return true;
  const [min = 0, max = 0] = (sideDishGroup.supportFood || '').split('-').filter(item => item);
  const totalCount = this.getSideDishesCount(food,dishIndex);
  const count =  this.foodStocks[`${item.foodName}_${item.units[0].unit}`]
  const  itemtotolCount = item.units[0].count || 0
  return totalCount >= max || itemtotolCount >= count;
}
},
  disableComposeFoodBtnText() {
  if (this.soldOut) {
  return $t(this.shopSetting.sellOutFoodComment);
}
  return $t('选好了');
},
  soldOut() {
  const { composeFood } = this;
  const stock = this.foodStocks[`${composeFood.foodName}_${composeFood.unit}`];
  return this.chooseCount(composeFood) >= stock;
},
  sideDishComplete(){
  let flag=true;
  this.composeFood.sideDishGroups.forEach(item=>{
  const [min = 0, max = 0] = (item.supportFood || '').split('-').filter(item => item);
  const sideDishesCount=item.sideDishes.reduce((number, target) => number + target.units.reduce((unitsCount, target) => unitsCount + (target.count || 0), 0), 0);
  //如果是被互斥组互斥的，那么久跳过他
  if (sideDishesCount < min &&  !this.sideGroupsHuchi(item)) flag=false;
})
  return flag;
},
  disableComposeFoodBtn() {
  const { composeFood } = this;
  let disabled = false;

  if (!composeFood) return true;
  if (this.soldOut) return true;

  if (composeFood.sideDishGroups&& composeFood.sideDishGroups.length) {
  if(!this.sideDishComplete) return true
}
  if (composeFood.foodTastes && composeFood.foodTastes.length && composeFood.foodTastes.some(group => group.required)) {
  //如果是被互斥组互斥的，那么久跳过他
  disabled = !composeFood.foodTastes.filter(group =>!this.sideGroupsHuchi(group) && group.required).every(option => option.tasteOption.some(item => item.isChecked));
  if (disabled) return disabled;
  composeFood.foodTastes.filter(group => group.required).forEach(item=>{
  if(this.sideGroupsHuchi(item)) return
  let  state = this.formatTasteNum(item);
  if(state.yixuan<state.xuxuan || state.yixuan<state.atLeast || state.yixuan<state.min){
  disabled=true;
}
})
  if (disabled) return disabled;
}

  if (composeFood.foodSetCategories && composeFood.foodSetCategories.length) {
  disabled = !composeFood.foodSetCategories.filter(item => item.canSwitch === '1').every(group => group.count === group.chooseCount || !group.chooseCount);
  if(disabled)return true;
  //若是校验固定套餐的点餐完备情况，放开注释即可。
  // disabled=composeFood.foodSetCategories.filter(item => item.canSwitch === '0').every(curGroup=>curGroup.foodSetDetails.some((food,curSubFoodIndex)=>this.disabledChildTasteBtn(curGroup.foodSetDetails[curSubFoodIndex])))
}
  return disabled;
},
  zicaiCanPlus(){
  return (group,item,groupIndex) =>{
  return (group.count >= group.chooseCount)  ||  this.zicaiSoldOut(item) || this.Enough(item, groupIndex)  || (item.limitCount&&item.count>=item.limitCount) || this.notGoodTime(item)
}
},
  zicaiSoldOut() {
  return detail => this.isSoldOut(detail);
},
  Enough() {
  return (group, groupIndex) => this.isEnough(group, groupIndex);
},
  quickHandle() {
  return !this.composeFood.foodSetCategories.length && !this.composeFood.sideDishGroups.length;
},
  quickMinusDisabled(){
  if(this.composeFood.chooseCount){
  return this.composeFood.count<=(this.composeFood.chooseCount || 0)
}
  if(this.composeFood.count ===1){
  return true;
}
  if(!this.isFillMinOrder()&&(this.composeFood.count-this.composeFood.minOrderCount)<=0){
  return true;
}
},
  includesCombo(){
  return (this.composeFood.foodSetCategories||[]).length;
},
  // 互斥
  setMutualExclusion(){
  return (group,itemName)=>{
  const groupName=group.desc||group.groupName
  let flagSide = this.sideGroupsHuchi(group);
  if(flagSide)  return flagSide;
  let compose=`${groupName}~${itemName}`
  for(let i=0;i<this.excludeGroups.length;i++){
  let group=this.excludeGroups[i];
  let keys=Object.keys(group);
  if(keys.includes(compose)&&Object.values(group).find((value,index)=>keys[index]!==compose&&value>0)) return true
}
  return false;
}
},
  setZicaiMutualExclusion(){
  return (zicaiName,groupName,itemName)=>{
  let compose=`${groupName}~${itemName}`
  let excludeGroups=this.zicaiExcludeGroups[zicaiName]||[]
  for(let i=0;i<excludeGroups.length;i++){
  let group=excludeGroups[i];
  let keys=Object.keys(group);
  if(keys.includes(compose)&&Object.values(group).find((value,index)=>keys[index]!==compose&&value>0)) return true
}
  return false;
}
},
},
  created(){
  this.initExcludeData();
  this.composeFood.units.length > 1 && this.shopSetting.foodUnitsSortway && this.reflowUnit();

  if(this.editFoodInCart){
  this.editFood();
}else{
  this.init();
}
  console.log('这里是   this.composeFood  ------------', this.composeFood);
},
  mounted() {
  this.$nextTick(()=>{
  new BScroll('.scroll-content', { click: true, bounce: false })
})
}
};
</script>

<style lang="scss" scoped>
  @import '../../../assets/styles/mixin';

  .food-model {
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
  .shade {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
  .model-box {
  bottom: 0;
  position: absolute;
  animation: fadeIn 0.3s;
  animation-fill-mode: forwards;
  border-radius: 0.3rem 0.3rem 0 0;
}
  .scroll-content {
  box-shadow: 0  0 1px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  /*width: calc(100vw - 0.96rem);*/
  width: calc(100vw - 0.86rem);
  max-height: 56vh;
  /*padding: 0 0.48rem;*/
  padding: 0 0.43rem;
}
  .model-food {
  padding: 0.48rem;
  padding-bottom: 0.28rem;
  display: flex;
  flex-direction: row;
  /*box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);*/
}
  .model-food_img {
  width: 2.48rem;
  height: 2.48rem;
  border-radius: 0.1rem;
  background-color: #f5f5f5;
}
  .big-mode{
  width: 2.16rem;
  height: 2.16rem;
}
  .model-food_info {
  padding-left: 0.3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
  .model-main_title {
  padding: 0.48rem;
  position: relative;
  width: calc(100vw - 0.96rem);
  border-radius: 8px 8px 0 0;
  /* box-shadow: 1px 1px 1px rgba(0, 0, 0, .1); */
}
  .food-info_name {
  display: flex;
  flex-direction: row;
}
  .info-name_text {
  flex: 1;
  font-weight: bold;
  font-size: 0.48rem;
  margin-right: 0.6rem;
}
  .food-tags {
  /*min-height: .66rem;*/
  padding-top: 0.2rem;
}
  .food-tag {
  display: flex;
  flex-wrap: wrap;
}
  .prolist1-item {
  color: #fff;
  overflow: hidden;
  max-width: 2.4rem;
  font-size: 0.3rem;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  padding: 0.03rem 0.12rem;
  margin: 0 0.24rem 0.16rem 0;
  border-radius: 0.12rem 0 0.12rem 0;
  background: linear-gradient(to right, #faac44, #ff8b2d);
}
  .prolist2-item {
  color: #333;
  overflow: hidden;
  max-width: 2.4rem;
  font-size: 0.3rem;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  padding: 0.05rem 0.12rem;
  border: 0.8px solid #ddd;
  margin: 0 0.24rem 0.16rem 0;
  border-radius: 0.12rem 0 0.12rem 0;
}
  .info-name_close {
  top: 0;
  right: 0;
  display: flex;
  padding: 0.48rem;
  position: absolute;
}
  .food-info_spec {
  word-break: break-all;
  font-size: 0.3rem;
  margin-top: 0.1rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 0.4rem;
  max-height: 1.2rem;
  overflow: hidden;
}
  .food-info_bottom {
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*flex-direction: column;*/
  .food_price_wrap{
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
}
}
  .info-vipprice_text,
  .info-vipprice_prefix,
  .info-vipprice_amount {
  display: flex;
}
  .food-info_curprice {
  display: flex;
  align-items: flex-end;
  .food-unit{
  font-size: 0.28rem;
  font-weight: 400;
  padding-left: 0.1rem;
}
}
  .info-curprice_prefix {
  font-weight: bold;
  font-size: 0.36rem;
  padding-right: 2px;
}
  .info-curprice_amount {
  font-weight: bold;
  font-size: 0.48rem;
  position: relative;
  bottom: -0.055rem;
}
  .model-title {
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
}
  .model-title_text {
  font-size: 0.36rem;
}
  .model-subtitle {
  font-size: 0.36rem;
}
  .model-checklist_wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: .45rem;
  width: 103.8%;
}
  .model-checklist_item {
  min-width: 29.8%;
  display: flex;
  justify-content: left;
  margin-right: 3.4%;
  position: relative;
  margin-top: 0.34rem;
  border-radius: .11rem;
  //background: red;
}
  .model-checklist_item-text {
  width: 100%;
  //overflow: hidden;
  font-size: 0.4rem;
  padding: 0.36rem .15rem;
  border-radius: .11rem;
  //white-space: nowrap;
  display: flex;
  justify-content: center;
  //text-overflow: ellipsis;
}
  .zicai-taste-option{
  box-sizing: border-box;
  width: 100%;
  //height: 1.18rem;
  display: flex;
  justify-content: center;
  word-break: break-all;
}
  .model-checklist_item.active {
  background-color: rgba(255, 109, 45, 0.2);
  color: #ff6d2d;
}
  .model-checklist_item-dot {
  position: absolute;
  right: -0.2rem;
  top: -0.2rem;
  height: 0.4rem;
  padding: 0 0.14rem;
  line-height: 0.43rem;
  border-radius: 0.2rem 0 0.2rem 0;
  background: linear-gradient(to right, #ff965d, #ff5b4f);
  display: flex;
  align-self: auto;
  justify-content: center;
  overflow: hidden;
  color: #fff;
  font-size: 0.28rem;
}
  .model-checklist_item-dot-gg {
  padding: 0 0.19rem;
  background: linear-gradient(to right, #ACACAC, #666666);
  align-items: center;
}
  .model-button {
  width: 100%;
  height: 1.14rem;
  font-size: 0.42rem;
  border-radius: .58rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .model-button.disabled {
  background-color: #999;
}
  .title-hasline {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  /*align-items: center;*/
  padding: 0.6rem 0;
  padding-bottom: 0;
}
  .title-hasline_line {
  height: 0.35rem;
  width: 0.08rem;
  border-radius: 0.04rem;
  /*align-self: flex-end;*/
}
  .title-hasline_text {
  font-size: 0.41rem;
  font-weight: 600;
  margin-left: 0.15rem;
  position: relative;
  bottom: -0.035rem;
  display: flex;
}
  .title-hasline_text-desc {
  font-weight: 500;
  font-size: 0.28rem;
  position: relative;
  bottom: -0.03rem;
  margin-left: 0.1rem;
  border: 0.02rem;
  border-style: solid;
  border-radius:0.06rem;
  padding:0  0.05rem;
  height: .4rem;
  display: flex;
  align-items: center;
}
  .title-hasline_text-desc /deep/ .has-select {
  color: #FF4646;
  margin-left: .1rem;
}
  .title-hasline_text-desc /deep/ .can-select {
  margin-right: .1rem;
}
  .title-hasline_text-desc /deep/ .can-select2 {
  /*margin-left: .1rem;*/
}
  .title-hasline_subtext {
  font-size: 0.3rem;
  color: #999;
  margin-left: 0.12rem;
  position: relative;
  bottom: -0.03rem;
}
  .small-food_wrap {
  margin-bottom: 0.2rem;
}
  .small-food {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.4rem;
}
  .small-food_left {
  display: flex;
}
  .small-food_right {
  align-self: flex-end;
  display: flex;
  align-items: center;
  font-size: 0.36rem;
  width: 2.4rem;
  justify-content: flex-end;
  min-width:2.4rem;
}
  .small-food_right,.quick_right{
  align-items: center;
}
  .food_diy{
  width:100%;
  height:0.63rem;
  span{
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: .5px solid #999;
  border-radius:0.32rem;
  font-size:0.32rem;
}
}
  .two_food_diy{
  width: 1.35rem;
  height:0.52rem;
  margin-bottom: .05rem;
}
  .big_food_diy{
  margin-top: .1rem;
}
  .small-food_diy{
  width:1.5rem;
}

  .guding-right{
  justify-content: space-between;
  padding-left: 1rem;
  height: 1.2rem;
  width: auto;
  min-width: 0;
}
  .must_count{
  margin-right: 0.23rem;
}
  .small-food_img {
  width: 1.2rem;
  height: 1.2rem;
  background-color: #f5f5f5;
  border-radius: 0.05rem;
}
  .small-food_info {
  flex: 1;
  padding-left: 0.35rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
  .small-food_foodname {
  word-break: break-all;
  margin-top: 0.1rem;
  font-size: 0.36rem;
}
  .food-name-unit {
  font-size: 0.32rem;
  margin-left: 0.1rem;
  span{
  display: inline-block;
  margin-top: .08rem;
  margin-left: .12rem;
  border-radius: .05rem;
  padding: 0 0.06rem;
}
}
  .small-food_price-wrap {
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
}
  .small-food_price {
  display: flex;
  font-size: 0.36rem;
  align-items: flex-end;
  margin-right: .2rem;
}
  .set-children-dish{
  font-weight: 600;
}
  .small-food_amount-prefix {
  font-size: 0.32rem;
  padding-right: 0.01rem;
}
  .small-food_tag {
  color: #ff553d;
  font-size: 0.26rem;
  padding: 0.03rem 0.1rem;
  margin-left: -.1rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  font-weight: 600;
  .a{
  font-size: 0.35rem ;
}
  .b{
  margin-left: .05rem;
  font-size: .29rem;
}
  .c{
  font-size: .4rem;
  font-weight: 600;
}
}
  .small-food_tag-sold {
  border: 0.8px solid #999;
}
  .small-food_tag.must {
  white-space: nowrap;
  border-radius: 0.3rem;
  color: #4ab132;
  border: 0.8px solid #4ab132;
}
  .small-food_taste {
  font-size: 0.32rem;
  margin-top: 0.1rem;
}
  .choose-box {
  margin-top: 0.5rem;
  height: 2.4rem;
  width: 100%;
  border: 1px dashed #e8e8e8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
  .choose-box_text {
  margin-top: 0.2rem;
  font-size: 0.32rem;
}
  .model-button_placeholder {
  width: 100%;
  height: 1.6rem;
  box-shadow: 0 -0px 1px rgba(0, 0, 0, 0.1);
}
  .model-button_wrap {
  padding: 0 0.48rem;
  position: fixed;
  z-index: 100;
  bottom: 0;
  height: 1.6rem;
  width: calc(100vw - 0.96rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
  .model-button_wrap_canSwitch {
  height: 1.6rem;
  padding: 0 0.24rem  0  .48rem;
  width: calc(100vw - 0.72rem);
  position: fixed;
  z-index: 100;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .model-button1{
  margin-right:0
}
  .model-button_left-text {
  display: flex;
  height: 100%;
  align-items: center;
  flex: auto;
  font-size:0.44rem;
  font-weight:500;
  padding-bottom: .1rem;
  .food_price_wrap-bottom{
  display: flex;
  align-items: flex-end;
  .food-info_vipprice{
  display: flex;
  justify-content: flex-end;
  margin-top: .15rem;
  .vip-triangle{
  margin-bottom: -0.2rem;
  margin-left: -0.38rem;
  left: 0;
  bottom: 0.2rem;
  position: absolute;
  border: 0.2rem solid;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  border-color: #f8d579 transparent transparent transparent;
}
}
}
  .food-info_curprice{
  padding-left: .1rem;
  margin-top: .23rem;
  margin-right: .2rem;
  .info-curprice_prefix{
  padding-bottom: .03rem;
  font-size: .45rem;
}
  .text{
  font-weight: bold;
}
  font-size: .5rem;
  height: .41rem;
  .info-curprice_amount{
  font-size: .78rem;
}
}
}
}
  .model-button_left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
  .model-foodlist {
  white-space: nowrap;
  width: calc(100vw - 0.96rem);
  padding: 0 0.48rem;
  overflow-x: auto;
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}
  .model-foodlist_item {
  display: inline-block;
  margin-right: 0.3rem;
  position: relative;
}
  .model-foodlist_item-active {
  width: 100%;
  height: 0.1rem;
  border-radius: 1rem;
}
  .model-foodlist_item:last-child {
  padding-right: 0.48rem;
}
  .model-foodlist_img {
  width: 2.48rem;
  height: 2.48rem;
  border-radius: 10px;
  background-color: #f5f5f5;
}
  .model-foodlist-pos {
  position: relative;
}
  .soldout-con {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.6);
  border-radius: 10px;
}
  .soldout {
  width: 50px;
  height: 50px;
  font-size: 0.32rem;
  line-height: 50px;
  margin: 20px auto;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffffff;
}
  .model-foodlist_dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #ff4f4f;
  font-size: 0.32rem;
  text-align: center;
  line-height: 16px;
  color: #fff;
}
  .model-foodlist_item:last-child .model-foodlist_dot {
  right: 0.48rem;
}
  .model-foodlist_text {
  width: 2.48rem;
  font-size: 0.36rem;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
  .cover {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  .inner {
  width: 86%;
  border-radius: 0.4rem;
  .inner-button{
  padding: 0 .2rem;
}
  .inner-scroll {
  padding: 0 0.2rem 0.5rem;
  .zicaiScroll {
  max-height: 50vh;
  overflow-y:hidden;
  padding: 0 .3rem .2rem;
  .model-checklist_item {
  /*color: #666;*/
  /*background: #f6f6f6;*/
}
  .model-title {
  color: #333;
}
}
  .model-close {
  position: relative;
  justify-content: flex-end;
  padding-top: 0.8rem;
  /*margin-right: -0.4rem;*/
  .zi-win-close{
  top: 50%;
  right: 0;
  z-index: 100;
  content: '';
  position: absolute;
  padding: .6rem .43rem;
  transform: translateY(-50%);
}
}
  .model-checklist {
  display: flex;
  flex-wrap: wrap;
}
  .model-btn {
  margin-top: 0.5rem;
  width: 100%;
  height: 1.14rem;
  font-size: 0.42rem;
  font-weight: bold;
  border-radius: .6rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
}
}
  .child-model-name {
  display: flex;
  font-size: 0.52rem;
  justify-content: center;
  margin: -0.8rem 0 0.5rem 0;
}
}
  .soldout-con1 {
  position: relative;
  top: -75px;
  width: 100%;
  height: 100%;
  background-color: rgba(138, 37, 37, 0.3);
  border-radius: 10px;
}
  .soldout1 {
  width: 100%;
  font-size: 0.32rem;
  line-height: 50px;
  margin: 20px auto;
  text-align: center;
  /*border-radius: 50%;*/
  background-color: rgba(0, 0, 0, 0.75);
  color: #ffffff;
}
  .food-remark{
  input{
  outline: none;
  border: none;
  margin-top: .37rem;
  height:.6rem;
  width: 93%;
  /*text-indent: .33rem;*/
  font-size:0.34rem;
  line-height:0.44rem;
  padding:.3rem .33rem
}
}
  .big-food-wraper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap:.43rem;
  grid-column-gap: .29rem;
  flex-wrap: wrap;
  padding-top: .45rem;
  .notSaleTime, .food-sell_out {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  position: absolute;
  border-radius: 0.2rem;
  background: rgba(0, 0, 0, 0.3);
}
  .sell-out{
  width: 3.03rem;
  color: #fff;
  font-size: .4rem;
  display: flex;
  height: 3.03rem;
  border-radius: 0.12rem 0.12rem 0 0 ;
  white-space: nowrap;
  text-align: center;
  position: absolute;
  align-items: center;
  justify-content: center;
  background:rgba(51,51,51,.49);
}
  .big-food{
  border: 0.5px solid ;
  border-color:var(--bchui);
  border-radius:.12rem;
  width: 3.03rem;
  overflow: hidden;
  .big-food_top{
  display: flex;
  width: 100%;
  height: 3.03rem;
  overflow: hidden;
  background-color: #f5f5f5;
  .big-food_img{
  width: 100%;
  height: 100%;
  border-radius: 0.12rem 0.12rem 0 0 ;
}
}
  div.bf-wraper_bottom{
  display: flex;
  width: 2.73rem;
  /*height: 2.09rem;*/
  flex-flow: column;
  /*border-radius: 0 0 0.12rem 0.12rem;*/
  /*border: 0.02rem solid  ;
  border-color:var(--bchui);
  border-top:none;*/
  padding:.11rem .12rem 0.17rem .15rem ;
  .big-vip-price-none{
  height: .57rem;
}
  .big-food_right{
  font-size: 0.36rem;
}
  .big-food_name{
  /*margin-top: .1rem;*/
  font-size:0.35rem;
  line-height:0.4rem;
  height: .79rem;
  max-width: 2.73rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  word-break: break-all;
  /*white-space: nowrap;*/
  text-overflow: ellipsis;
  overflow: hidden;
  /*    overflow: hidden;
      max-width: 6.3rem;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!
      -webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!
      -webkit-line-clamp: 2; !** 显示的行数 **!
      */
  .name-unit{
  font-size: 0.26rem;
  margin-left: 0.1rem;
}
}
  .big-food_taste{
  margin:0.09rem 0 .17rem;
  width:2.73rem;
  height:0.35rem;
  font-size:0.26rem;
  font-weight:500;
  line-height:0.35rem;
  text-overflow: ellipsis;
  /*word-break: break-all;*/
  white-space: nowrap;
  overflow: hidden;
}
  .guding-price{
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: .1rem;
}
  .big-food_price{
  font-size: .29rem;
  display: flex;
  align-items: baseline;
  position: relative;
  margin-top:.05rem;
  .big_amount-prefix{
  /*margin-right: .09rem;*/
  font-size: .35rem;
}
  .big_amount{
  font:{
  size:.42rem;
  weight: bold;
}
}
  .big_tag{
  position: absolute;
  right: 0;
  font-size: .29rem;
  padding-right: 0;
}
  .sold-out{
  color:#999;
}
}
  .big-food_price + .food-button{
  margin-top: .13rem;
}
  .big-food_bottom{
  display: flex;
  justify-content: space-between;
  font-size: 0.34rem;
  font-weight: 500;
  line-height: 0.34rem;
  .number{
  display: flex;
  align-items: center;
}
}
}
}
  .hll-comp-plus,
  .hll-comp-minus {
  width: .57rem;
  height: .57rem;
}
  /*&>.big-food:first-child{*/
  /*  margin-left: 0;*/
  /*}*/
}
  .two-food-wraper{
  display: grid;
  grid-template-columns: repeat(2, 4.84rem);
  grid-row-gap:.29rem;
  grid-column-gap: .26rem;
  flex-wrap: wrap;
  padding-top: .45rem;
  .two-food,.no-pic-food{
  display: flex;
  height: 1.66rem;
  padding:.17rem .17rem  0.17rem  .12rem ;
  border-radius:0.12rem;
  border:.014rem solid transparent;
  .two-left{
  width: 1.15rem;
  height: 1.15rem;
  border-radius: .12rem;
  margin-right: .12rem;
  .two-food_img {
  width: 100%;
  height: 100%;
  border-radius: 0.12rem;
  background-color: #f5f5f5;
}
}
  .two-content{
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  flex: 1;
  overflow: hidden;
  /*padding-top: .06rem;*/
  .two-name-unit{
  font-size:0.35rem;
  display: flex;
  justify-content: space-between;
  .name-unit{
  display: flex;
  flex: 1;
  /*align-items: flex-end;*/
  align-items: baseline;
  overflow: hidden;
  .two-food_name{
  max-width: 2.92rem;
  @include text-overflow(auto);
}
  .food_name{
  max-width: 3.8rem;
  @include text-overflow(auto);
}
  .two-unit{
  font-size: .29rem;
}
}
}
  .two-food_tag{
  color: #ff553d;
  font-size: 0.26rem;
  padding: 0.03rem 0.1rem;
  margin-left: -.1rem;
  white-space: nowrap;
  display: table-cell;
  vertical-align: bottom;
  /*align-items: flex-end;*/
  .a{
  font-size: 0.32rem ;
}
  .b{
  font-size: .26rem;
  margin-left: -.1rem;
}
  .c{
  margin-left: -.05rem;
  font-size: .35rem;
  font-weight: 600;
}
}
  .two-content-bottom{
  .price-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  .original-price{
  display: flex;
}
  .two-food_price{
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  font-weight: 600;
  line-height: 0.39rem;
  .two-prefix{
  line-height: .29rem;
  font-size: .29rem;
}
  .two-amount{
  font-size: .43rem;
}
}
  .food-info_vipwrap{
  margin-left: .12rem;
  margin-bottom: 0;
}
  .two-count{
  display: inline-flex;
  flex: 1;
  justify-content: flex-end;
  .food-button_capsule{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
}
  .food-button{
  height: .52rem;
}
  .hll-comp-plus,
  .hll-comp-minus {
  width: .52rem;
  height: .52rem;
}
}
}
}
}
  .no-pic-food{
  height: 1.33rem;
}
}
</style>
