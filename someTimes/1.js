/**
 *
 * @author  晴云
 * @create 2019-04-23 8:55
 * @note 干什么的呢？
 **/

var roleType = 3
// role 1是总部，2是代理商，3是员工
var routerMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false,
      role: [1, 2, 3],
      menuName: '登陆'
    }
  },
  {
    path: '/',
    name: 'Layout',
    meta: {
      requireAuth: false,
      role: [1, 2, 3],
      menuName: '首页',
      configName: '0-1'
    },
    children: [
      {
        path: '/goodsManage',
        name: 'goodsManage',
        meta: {
          role: [1, 2],
          menuName: '商品管理',
          configName: '1'
        },
        children: [
          {
            path: 'list',
            name: 'goodsManageList',
            meta: {
              role: [1, 2],
              menuName: '商品列表',
              configName: '1-1',
              showMenu: true
            }
          },
          {
            path: 'handle/:id/:type',
            name: 'goodsManageHandle',
            meta: {
              role: [1, 2],
              menuName: '商品操作',
              configName: '1-1'
            }
          },
          {
            path: 'show/:id',
            name: 'goodsManageShow',
            meta: {
              role: [1, 2],
              menuName: '商品详情',
              configName: '1-1'
            }
          },
          {
            path: 'audit',
            name: 'goodsManageAudit',
            meta: {
              role: [1, 2],
              menuName: '商品审核',
              configName: '1-2',
              showMenu: true
            }
          }
        ]
      },
      {
        path: '/articleManage',
        name: 'articleManage',
        meta: {
          role: [1, 2],
          menuName: '文章管理',
          configName: '2'
        },
        children: [
          {
            path: 'list',
            name: 'articleManageList',
            meta: {
              role: [1, 2],
              menuName: '文章列表',
              configName: '2-1',
              showMenu: true
            }
          },
          {
            path: 'handleArticle/:id/:type',
            name: 'articleManagehandleArticle',
            meta: {
              role: [1, 2],
              menuName: '文章操作',
              configName: '2-1'
            }
          },
          {
            path: 'database',
            name: 'articleManageDatabase',
            meta: {
              role: [1, 2],
              menuName: '素材库',
              configName: '2-2',
              showMenu: true
            }
          }
        ]
      },
      {
        path: '/businessManage',
        name: 'businessManage',
        meta: {
          role: [1, 2, 3],
          menuName: '商机管理',
          configName: '3'
        },
        children: [
          {
            path: 'consumer/list',
            name: 'businessConsumerList',
            meta: {
              role: [1, 2, 3],
              menuName: '消费者商机',
              configName: '3-1',
              showMenu: true
            }
          },
          {
            path: 'consumer/show/:id',
            name: 'businessConsumerShow',
            meta: {
              role: [1, 2, 3],
              menuName: '消费者商机操作',
              configName: '3-1'
            }
          },
          {
            path: 'agent/list',
            name: 'BusinessAgentList',
            meta: {
              role: [1, 2],
              menuName: '代理商商机',
              configName: '3-2',
              showMenu: true
            }
          }
        ]
      },
      {
        path: '/authManage',
        name: 'authManage',
        meta: {
          role: [1, 2],
          menuName: '权限管理',
          configName: '4'
        },
        children: [
          {
            path: 'agent/list',
            name: 'authManageAgentList',
            meta: {
              role: [1],
              menuName: '代理商管理',
              configName: '4-1',
              showMenu: true
            }
          },
          {
            path: 'agent/handle/:id/:type',
            name: 'authManageAgentHandle',
            meta: {
              role: [1],
              menuName: '代理商操作',
              configName: '4-1'
            }
          },
          {
            path: 'employee/list',
            name: 'authManageEmployeeList',
            meta: {
              role: [1, 2],
              menuName: '员工管理',
              configName: '4-2',
              showMenu: true
            }
          },
          {
            path: 'employee/handle/:id/:type',
            name: 'authManageEmployeeHandle',
            meta: {
              role: [1, 2],
              menuName: '员工管理操作',
              configName: '4-2'
            }
          }
        ]
      }
    ]
  }
]
function mapAouter (routerArr) {
  return routerArr.filter((item, index, routerArr) => {
    if (item.meta.role.includes(roleType)&&item.children && item.children.length > 0) {
      let a=mapAouter(item.children);
      routerArr[index].children.splice(0,routerArr[index].children.length,...a)
      // routerArr[index] = Object.assign({}, item, { children: a })
    }
    return item.meta.role.includes(roleType)
  })
}
// routerMap = mapAouter(routerMap.filter(item => item.meta.role.includes(roleType)))
routerMap = mapAouter(routerMap)

console.log(routerMap, 'routerMap')
