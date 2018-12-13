/**
 *
 * @author  晴云
 * @create 2018-12-13 17:00
 * @note 干什么的呢？
 **/


var a = [{
  path: '/reportDIY',
  redirect: '/reportDIY/diy',
  name: 'DIYReport',
  children: [
    {
      path: 'diy',
      name: 'reportDIY',
      meta: {
        id: '200',
        type: 1,
        context: '自助报表'
      },
      children: [
        {
          path: '',
          name: 'reportTree',
          meta: {
            id: '20000',
            type: 1,
            context: '自助报表'
          },
          children: []
        }
      ]
    },
    {
      path: 'group',
      name: 'reportGroup',
      meta: {
        id: '201',
        type: 1,
        context: '报表组'
      },
      children: [
        {
          path: 'list',
          name: 'reportGroupList',
          meta: {
            id: '20100',
            type: 1,
            context: '报表组'
          },
          children: []
        }
      ]
    },
    {
      path: 'field',
      redirect: '/report/field',
      name: 'reportField',
      meta: {
        id: '202',
        type: 1,
        context: '数据字段'
      },
      children: [
        {
          path: '',
          name: 'FieldMList',
          meta: {
            id: '20200',
            type: 1,
            context: '字段管理'
          }
        },
        {
          path: '/report/field/detail',
          name: 'FieldMDetail',
          meta: {
            id: '20201',
            type: 3,
            context: '字段详情',
            preBread: {
              context: '字段管理',
              name: 'FieldMList'
            }
          }
        },
        {
          path: 'add',
          name: 'FieldMAdd',
          meta: {
            id: '20202',
            type: 3,
            context: '新增字段',
            preBread: {
              context: '字段管理',
              name: 'FieldMList'
            }
          }
        },
        {
          path: 'update',
          name: 'FieldMUpdate',
          meta: {
            id: '20203',
            type: 3,
            context: '修改字段',
            preBread: {
              context: '字段管理',
              name: 'FieldMList'
            }
          }
        },
        {
          path: '/field/verify/list',
          name: 'FieldVerifyList',
          meta: {
            id: '20204',
            type: 1,
            context: '字段审核'
          }
        },
        {
          path: 'verify/detail',
          name: 'FieldVerifyDetail',
          meta: {
            id: '20205',
            type: 3,
            preBread: {
              name: 'FieldVerifyList',
              context: '字段审核'
            },
            context: '修改'
          }
        }

      ]
    },
    {
      path: 'dimension',
      name: 'dimension',
      redirect: '/report/dimension/list',
      meta: {
        id: '203',
        type: 1,
        context: '数据维度'
      },
      children: [{
        path: 'list',
        name: 'dimensionList',
        meta: {
          id: '20301',
          type: 2,
          context: '维度管理'
        }
      }, {
        path: 'detail/:id',
        name: 'dimensionDetail',
        meta: {
          id: '20302',
          type: 3,
          context: '维度详情',
          preBread: {
            name: 'dimensionList',
            context: '维度管理'
          }
        }
      }, {
        path: 'add',
        name: 'dimensionAdd',
        meta: {
          id: '20303',
          type: 3,
          context: ' 新建维度',
          preBread: {
            name: 'dimensionList',
            context: '维度管理'
          }
        }
      }, {
        path: 'dimensionEdit/:id',
        name: 'dimensionEdit',
        meta: {
          id: '20304',
          type: 3,
          context: '编辑维度',
          preBread: {
            name: 'dimensionDetail',
            context: '维度详情'
          }
        }
      }, {
        path: 'dimensionVerifyList',
        name: 'DimensionVerifyList',
        meta: {
          id: '20305',
          type: 2,
          context: '维度审核列表'
        }
      },
        {
          path: 'dimensionVerifyDetail/:id',
          name: 'DimensionVerifyDetail',
          meta: {
            id: '20306',
            type: 3,
            context: '维度审核详情',
            preBread: {
              name: 'dimensionVerifyList',
              context: '维度审核列表'
            }
          }
        }]
    },
    {
      path: 'indicator',
      name: 'indicator',
      redirect: '/report/indicator/manageList',
      meta: {
        id: '204',
        type: 1,
        context: '数据指标'
      },
      children: [{
        path: 'manageList',
        name: 'IndicatorManageList',
        meta: {
          id: '20400',
          type: 2,
          context: '指标管理'
        }
      },
        {
          path: 'manageAdd',
          name: 'IndicatorManageAdd',
          meta: {
            id: '20401',
            type: 3,
            context: '新建指标',
            preBread: {
              context: '指标管理',
              name: 'IndicatorManageList'
            }
          }
        },
        {
          path: 'manageDetail/:id',
          name: 'IndicatorManageDetail',
          meta: {
            id: '20402',
            type: 3,
            context: '指标详情',
            preBread: {
              context: '指标管理',
              name: 'IndicatorManageList'
            }
          }
        },
        {
          path: 'manageEdit/:id',
          name: 'IndicatorManageEdit',
          meta: {
            id: '20403',
            type: 3,
            context: '编辑指标',
            preBread: {
              context: '指标管理',
              name: 'IndicatorManageList'
            }
          }
        },
        {
          path: 'verifyList',
          name: 'IndicatorVerifylist',
          meta: {
            id: '20404',
            type: 2,
            context: '指标审核列表'
          }
        },
        {
          path: 'verifyDetail/:id',
          name: 'IndicatorVerifyDetail',
          meta: {
            id: '20405',
            type: 3,
            context: '指标审核详情',
            preBread: {
              context: '指标审核列表',
              name: 'IndicatorVerifylist'
            }
          }
        }]
    }
  ],
  meta: {
    id: '2',
    type: 0,
    context: '自助报表'
  }
}]

function getMenu(menuList,parentId) {
  let result = [];
  result = menuList.map((menu, index, array) => {
    let temp = [{id: menu.meta.id, parentId,type:menu.meta.type, name: menu.meta.context, level: Math.floor((menu.meta.id + '').length/2+1)}]
    if (menu.children && menu.children.length > 0) {
      temp=temp.concat(getMenu(menu.children,menu.meta.id))
    }
    return temp
  })

  return result;
}

var result = getMenu(a,-1).flat(Infinity).filter(v=>v.type!='3');
console.log(result);
