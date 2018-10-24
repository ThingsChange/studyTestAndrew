// ==UserScript==
// @name         中二
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @match        https://www.qingyidai.com/qy/index.shtml
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
    /* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */
    window.getCookies = function getCookies(cookie = '') {
        return cookie.split(';').reduce((pre, cur) => {
            var parts = cur.split('=')
            return (pre[parts[0].trim()] = (parts[1] || '').trim()) && pre
        }, {})
    };
(function () {

    var ticket = null, times = 0, interval = 5000, win, dt = new Date(), win = window, lastCache = null, refreshList = []
    var qydBuyer = {
        _url: {
            // 获取购买提交时的token的url
            getSubmitToken: '/entrance/mt/getSubmitToken/json',
            // 购买的url
            buyAssignment: '/entrance/mt/buyAssignment/json',
            // 查询账户信息，余额
            accountInfo: '/entrance/account/accountinfo/json',
            // 交易记录
            queryTransactionList: '/entrance/finder/querytransactionlist/json',
            // 交易详情
            transactiondetail: '/entrance/finder/transactiondetail/json',
            // 月盈需在POST body添加 productType:"YY"
            getHoldingAssignmentList: '/entrance/mt/getHoldingAssignmentList/json',
            // 获得标的
            getQyyLoanList: '/entrance/mt/getQyyLoanList/json',
            // 轻盈和月盈投资投资概要信息 productType:"YY"|"QY", items
            mtpossessioninfo: '/entrance/mt/mtpossessioninfo/json',
            // 众盈投资概要查询
            queryzyaccountinfo: '/entrance/zy/queryzyaccountinfo/json',
            // 代金券
            rewardslist: '/entrance/app/loan/rewardslist/json',
            // 众盈可投资金额查询
            zyRemainCanInvestAmount: '/entrance/zy/zyRemainCanInvestAmount/json',
            // 月盈和轻盈可投资金额查询
            querySurplusAmount: '/entrance/mt/querySurplusAmount/json',
            // 月盈优先和轻盈A可投资金额查询
            indexinfo: '/entrance/mt/indexinfo/json',
            //
        },
        get _token() {
            let curTooken = window.getCookies(document.cookie)['x_auth_token_encode']
            if (!this.__token || this.__token != curTooken) {
                this.__token = curTooken
            }
            if (!this.__token) {
                appendMessage('token为空，请登录后再试')
                window.location.href = '/member/login.shtml'
                throw new Error('token为空，请登录后再试')
                return;
            }
            return this.__token
        },
        // md5的方法是否加载, 提交时密码加密用
        _md5Loaded: false,
        _productType: {
            QY: 'QY',
            YY: 'YY'
        },
        _threshold: {
            ['QY']: 10,
            ['YY']: 8.8
        },
        QY: {
            remainingPeriod: 25,
            tryBuyAmount: 200
        },
        YY: {
            remainingPeriod: 11,
            tryBuyAmount: 200
        },
        _transferType: {
            ALL: '', // 全部
            RECHARGE: 'RECHARGE', // 充值
            WITHDRAW: 'WITHDRAW', // 提现
            TRANSFER_IN: 'TRANSFER_IN', // 投资
            TRANSFER_OUT: 'TRANSFER_OUT', // 撤资
            TRANSFER: 'TRANSFER' // 转账
        },
        _rewardsSatus: {
            normal: 'normal',
            used: 'used',
            due: 'due'
        },
        _params: {
            YY: {
                productType: 'YY',
                queryType: 1
            },
            QY: {
                queryType: 1
            }
        },
        _amount: {
            QY: 5000,
            YY: 2000
        },
        // 封装fetch
        fetch: function (url, headers, body = {}, cb) {
            return fetch(url, {
                method: 'POST',
                headers: Object.assign({
                    'X-Auth-Token': this._token
                }, headers),
                body: JSON.stringify(body || {})
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r : null).then(cb)
        },
        // 获取账户信息
        getAccountInfo: function () {
            return fetch(this._url.accountInfo, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Auth-Token': this._token
                },
                body: JSON.stringify(Object.assign({}))
            })
                .then(res => res.json())
                .then(r => r.status === 200 && r.successful ? r.entity : {})
        },
        // transferStatus ""全部,"0"处理中，"1"成功，"2"失败，"4"部分成功
        queryTransactionList: function (transferType = "TRANSFER_IN", transferStatus = "", days = 30, size = 1) {
            let d = new Date(),
                createEndDate = d,
                createStartDate = d;
            d.setHours(d.getHours() + 8)
            createEndDate = d.toJSON().split('T')[0]
            d.setDate(d.getDate() - days)
            createStartDate = d.toJSON().split('T')[0]

            return fetch(this._url.queryTransactionList, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Auth-Token': this._token,
                    range: `Entity=1-${size}` // 页码-页大小
                },
                body: JSON.stringify(Object.assign({
                    createEndDate,
                    createStartDate,
                    subType: "",
                    transferStatus,
                    transferType
                }))
            }).then(res => res.json()).then(r =>
                r.status === 200 && r.successful ? r.items : null
            )
        },
        transactiondetail: function (transactionId) {
            return fetch(this._url.transactiondetail, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Auth-Token': this._token,
                    range: 'Entity=1-10' // 页码-页大小
                },
                body: JSON.stringify({
                    transactionId
                })
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.items : null)
        },
        getHoldingAssignmentList: function (productType = "QY", size = 3) {
            return fetch(this._url.getHoldingAssignmentList, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Auth-Token': this._token,
                    range: `Entity=1-${size}` // 页码-页大小
                },
                body: JSON.stringify({
                    productType
                })
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.items : null)
        },
        // 获得购买时需要提交的token
        getSubmitToken: function () {
            return fetch(this._url.getSubmitToken, {
                method: 'POST',
                body: JSON.stringify({
                    'X-Auth-Token': this._token
                })
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.entity.submitToken : null)
        },
        // 购买
        buy: async function (productType, amount = 200, submitToken) {
            amount = Math.floor(+amount)
            appendMessage(`开始进行购买${productType}，购买金额${amount}`)
            return fetch(this._url.buyAssignment, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    amount,
                    password: this._pwd,
                    productType,
                    submitToken,
                    terminal: '00'
                })
            }).then(res => res.json()).then(r => {
                if (r.status != 200 || !r.successful) {
                    clearInterval(ticket)
                    appendMessage(r.resultCode.message)
                    //提示操作频繁后，600毫秒后重新购买
                    if (r.resultCode.message.indexOf('频繁') >= 0) {
                        appendMessage('操作过于频繁，1S后恢复购买')
                        setTimeout(() => this.directlyBuy(amount, productType), 1000)
                        return true
                    }
                    console.log(`购买结束，原因：${r.resultCode.message}`)
                    return false
                }
                return true
            })
        },
        // 获得标的
        getQyyLoanList: async function (productType = qydBuyer._productType.QY, pageSize = 10) {
            var body = {
                queryType: 1,
                curPageNo: 1,
                pageSize
            }
            if (productType != qydBuyer._productType.QY) {
                body.productType = productType
            }
            return fetch(this._url.getQyyLoanList, {
                method: 'POST',
                credentials: 'include',
                /*headers: {
                  'X-Auth-Token': this._token
                },*/
                body: JSON.stringify(body)
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.items : null)
        },
        // 轻盈月盈投资摘要信息
        mtpossessioninfo: async function (productType = qydBuyer._productType.QY) {
            return fetch(this._url.mtpossessioninfo, {
                method: 'POST',
                headers: {
                    'X-Auth-Token': this._token
                },
                body: JSON.stringify({ productType })
            }).then(res => res.json()).then(r => r.status === 200 && r.successful && r.items && r.items.length > 0 ? r.items[0] : null)
        },
        // 众盈摘要信息
        queryzyaccountinfo: async function () {
            return fetch(this._url.queryzyaccountinfo, {
                method: 'POST',
                headers: {
                    'X-Auth-Token': this._token
                },
                body: JSON.stringify({})
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.entity : null)
        },
        // 代金券
        rewardslist: async function (status = qydBuyer._rewardsSatus.used, size = 10) {
            return fetch(this._url.rewardslist, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-Auth-Token': this._token,
                    range: `Entity=1-${size}` // 页码-页大小
                },
                body: JSON.stringify({
                    range: `Entity=1-${size}`,
                    status
                })
            }).then(res => res.json()).then(r => r.status === 200 && r.successful ? r.items : null)
        },
        // 众盈可投，remainCanInvestAmount字段为剩余可投
        zyRemainCanInvestAmount: function () {
            return this.fetch(this._url.zyRemainCanInvestAmount, null, null, r => r ? r.entity : null)
        },
        // 月盈和轻盈可投
        querySurplusAmount: function (productType = qydBuyer._productType.YY) {
            return this.fetch(this._url.querySurplusAmount, null, { productType }, r => r ? r.items[0] : null)
        },
        // 月盈优先和轻盈A可投
        indexinfo: function (productType = qydBuyer._productType.YY) {
            return this.fetch(this._url.indexinfo, null, { productType }, r => r ? r.items[0] : null)
        },
        // 过滤掉已经关闭的标的
        filterItems: function (d) {
            let index = d.findIndex(v => v.status === 'CLOSE')
            return d.slice(0, Math.min(index, d.length))
        },
        // 加载md5加密方法
        loadMD5: function () {
            if (typeof window.md5 === 'function') {
                return Promise.resolve()
            }
            return fetch('/static/common/widget/md5.js').then(res => res.text()).then(s => {
                (new Function('window', s
                    .replace(/define\(function \(\) \{/, '')  // 替换开始
                    .replace(/\}\);/, '')                     // 替换结尾
                    .replace('return hex_md5;', 'window.md5=hex_md5;') // 替换返回值
                ))(window)
            })
        },
        // 设置密码
        pwd: function (pwd) {
            this._pwd = win.md5(pwd)
            appendMessage('支付密码设置成功')
            return this
        },
        assert: async function (productType) {
            return new Promise(async (resolve, reject) => {

                let r = await this.queryTransactionList()
                appendMessage(Date.now(), `尝试查询交易列表完毕`)
                r = r[0]
                // 2S内的交易 ，成功1或者部分成功4
                if (Date.now() - new Date(r.transactionTime).getTime() < 2000 &&
                    ["1", "4", "0", "3"].indexOf(r.transferStatus) >= 0) {
                    //交易详情
                    r = await this.ensureTransactiondetail(r.id)
                    appendMessage(Date.now(), `尝试查询交易详情完毕`)
                    if (r && r.length > 0) {
                        // 过滤掉不成功的
                        r = r.filter(d => d.loanId)
                        // 存在成交成功
                        if (r.length > 0) {
                            // 取最后一个
                            r = r.reverse()[0]
                            if (Number.parseFloat(r.rate) >= this._threshold[productType]) {
                                return resolve(true);
                            } else {
                                appendMessage(Date.now(), `结束当前购买回合，因为当前最大利率为${r.rate}`)
                                return resolve(false);
                            }
                        } else {
                            appendMessage(Date.now(), `结束当前购买回合，因为当前购买失败`)
                            return resolve(false)
                        }
                    } else {
                        appendMessage(Date.now(), `结束当前购买回合，因为获取交易详情失败`)
                        return resolve(false)
                    }
                } else {
                    r = await this.ensureTransactiondetail(r.id)
                    appendMessage(Date.now(), `结束当前购买回合，因为${(r && r[0].reason) || '未知错误'}`)
                    return resolve(false)
                }
            })
        },
        // 获得交易详情
        ensureTransactiondetail: async function (transactionId) {
            var _tt, _times = 0, r, interval1 = 650, interval2 = 450
            return new Promise(async (resolve, reject) => {
                r = await this.transactiondetail(transactionId)
                if (r && r.length > 0) {
                    return resolve(r)
                } else {
                    _tt = setInterval(async () => {
                        r = await this.transactiondetail(transactionId)
                        if (r && r.length > 0) {
                            clearInterval(_tt)
                            return resolve(r)
                        }
                        _times++
                        appendMessage(Date.now(), `_times ${_times}`)
                        if (_times > 20) {
                            clearInterval(_tt)
                            return reject(null)
                        }
                    }, _times > 2 && _times < 7 ? interval2 : interval1)
                }
            });
        },
        // 尝试去购买
        trBuy2: async function (productType = qydBuyer._productType.QY, amount) {
            let r,
                token = await this.getSubmitToken()
            appendMessage(Date.now(), `尝试购买获取submit token完毕`)
            // 尝试去购买
            var success = await this.buy(productType, this[productType].tryBuyAmount, token)
            appendMessage(Date.now(), `尝试购买完毕`)
            if (success) {
                // 是否可以去购买
                let canBuy = await this.assert(productType)
                if (canBuy) {
                    token = await this.getSubmitToken()
                    appendMessage(Date.now(), `购买获取submit token完毕`)
                    let ac = await this.getAccountInfo()
                    success = await this.buy(productType, Math.min(amount || this._amount[productType], Number.parseFloat(ac.availableBalance - 300)), token)
                    if (success) {
                        // 如果第一次可以购买成功，并且购买后的结果利率大于依旧可以购买，翻倍购买
                        canBuy = await this.assert(productType);
                        if (canBuy) {
                            ac = await this.getAccountInfo()
                            success = await this.buy(productType, Math.min((amount || this._amount[productType]) * 2, Number.parseFloat(ac.availableBalance - 300)), token)
                            if (success) {
                                canBuy = await this.assert(productType);
                                if (canBuy) {
                                    await this.buy(productType, Math.min((amount || this._amount[productType]) * 4, Number.parseFloat(ac.availableBalance - 300)), token)
                                    this.intelligenceBuy(productType)
                                } else {
                                    this.intelligenceBuy(productType)
                                }
                            }
                        } else {
                            this.intelligenceBuy(productType)
                        }
                    }
                    appendMessage(Date.now(), `购买完毕`)
                } else {
                    this.intelligenceBuy(productType)
                }
            }
        },
        directlyBuy: async function (amount, productType = qydBuyer._productType.QY) {
            var token = await qydBuyer.getSubmitToken()
            appendMessage(Date.now(), `尝试购买${amount}获取token完毕`)
            // 尝试去购买
            var success = await qydBuyer.buy(productType, amount, token)
            appendMessage(Date.now(), `购买${amount}完毕`)
        },
        // 智能购买，2S刷新一次，如果两次不一样，属于刷了缓存，这个时候读取刷新后的标的，满足设置的阀值就直接购买
        intelligenceBuy: async function (productType = qydBuyer._productType.QY) {
            try {
                var r = await this.getQyyLoanList(productType)
                $('a[data-flag="#js_zr_join"]').trigger('click')
                //如果没有上次记录的结果，并且这次获得项目有没关闭的
                if (!lastCache) {
                    lastCache = r
                }

                // 当前不为空，并且项目编号不一致,并满足购买条件
                // 前面部分数据可能不更新
                if (r&&r.length>0 && lastCache && (r[0].projectNumber !== lastCache[0].projectNumber
                    || r[r.length - 1].projectNumber !== lastCache[lastCache.length - 1].projectNumber)) {

                    refreshList.push(new Date().toLocaleString())
                    appendMessage(`${new Date().toLocaleString()}:缓存更新进行检查`)
                    var tempList = r
                    r = this.reComputeList(r, lastCache)
                    var curPro = r.filter(p => p.status === 'OPEN').shift()

                    if (curPro.remainingPeriod <= this[productType].remainingPeriod) {
                        appendMessage(`${new Date().toLocaleString()}:目标天数${this.QY.remainingPeriod}，最新最小天数${curPro.remainingPeriod}，开始进行购买`)
                        var amount = this.intelligenceAmount(r)
                        lastCache = tempList
                        await this.trBuy2(productType, amount)
                        return
                    } else {
                        appendMessage(`${new Date().toLocaleString()}:目标天数${this.QY.remainingPeriod}，更新后缓存最小天数${curPro.remainingPeriod}, ${curPro.pdAmount}，继续监听`)
                        ticket = setTimeout(() => {
                            this.intelligenceBuy(productType)
                        }, interval);
                        lastCache = tempList
                    }

                } else {
                    appendMessage(`${new Date().toLocaleString()}:目标天数${this.QY.remainingPeriod}，缓存最小天数${r[0].remainingPeriod}, ${r[0].pdAmount}，继续监听`)
                    ticket = setTimeout(() => {
                        this.intelligenceBuy(productType)
                    }, interval);
                    lastCache = r
                }
            } catch (err) {
              console.log(r,lastCache);
              appendMessage(`发生未知错误${err.message || 'xxxxxx'},尝试恢复`)
                this.intelligenceBuy(productType)
            }
        },
        //  因为前部分数据可能没更新，可能是交易进行中或者。。。。瞎猜的
        reComputeList: function (list, cache) {
            var newList = [];
            for (var i = 0; i < list.length; i++) {
                if (list[i].projectNumber !== cache[i].projectNumber) {
                    newList.push(list[i])
                }
            }
            return newList
        },
        intelligenceAmount: function (loanList = []) {
            let loanAmount = loanList
                .filter(p => p.status === 'OPEN')
                .filter(p => p.remainingPeriod <= this[p.productType].remainingPeriod)
                .reduce((pre, cur) => ({ pdAmount: (+pre.pdAmount) + (+cur.pdAmount) }), { pdAmount: '0' })
                .pdAmount, unit = 10000
            let base = Math.floor(loanAmount / unit)
            if (base > 100) {
                return unit * 5
            } else if (base >= 50) {
                return unit * 4
            } else if (base >= 20) {
                return unit * 1
            } else if (base > 10) {
                return unit * 1
            } else if (base > 5) {
                return unit * 1
            } else if (base > 2) {
                return unit * 0.5
            } else {
                return loanAmount
            }
        },
        buyAll: async function (productType = qydBuyer._productType.QY) {
            appendMessage(`全部购买${productType} amount开始`)
            var ac = await this.getAccountInfo();
            amount = +(ac.availableBalance - 300)
            await this.directlyBuy(amount, productType)
            appendMessage(`全部购买${productType} amount完毕`)
        },
        // 统计投资
        statistics: async function (productType = qydBuyer._productType.QY, day) {

            var r = await this.getHoldingAssignmentList(productType, 1000),
                obj = {}, objRange = {}
            // 过滤某天
            if (day) {
                r = r.filter(v => v.createTime.split(' ')[0] == day)
            }
            //计算某个利率的投资
            r.map(v => {
                obj[v.realInterestRate] ? obj[v.realInterestRate] += parseFloat(v.principle) : obj[v.realInterestRate] = parseFloat(v.principle)
            })

            // 计算整数利率的投资
            for (var p in obj) {
                var k = Math.floor(p)
                objRange[k] ? objRange[k] += parseFloat(obj[p]) : objRange[k] = parseFloat(obj[p])
            }
            //计算总数
            var sum = 0
            for (var p in objRange) {
                sum += objRange[p]
            }
            // 输出
            let list = [];
            appendMessage('合计投资   ', (sum / 10000).toFixed(2), '万')
            for (var p in objRange) {
                list.push({
                    '利率': +p,
                    '投资（万）': +(objRange[p] / 10000).toFixed(2),
                    '占比（%）': +(objRange[p] * 100 / sum).toFixed(2)
                })
            }
            console.table(list)
        },
        // 收益统计
        interest: async function () {
            // 总资产 =   currentAmount(稳盈) + hyAmount(欢盈) + qyAmount(轻盈)
            //       + zyAmount(众盈) + yyAmount(月盈) +  xsbAmount(新手标) + transferingInAmount(处理中) + availableBalance(余额)
            // 假设没有转账，借款 还款 退款
            // 总资产 = 充值 - 提现 + 收益  => 收益 =  总资产 + 提现 - 充值
            // 本人只投资 月盈，众盈，轻盈，排除新手标，稳盈，欢盈，处理中，所以 总资产 = 月盈 + 众盈 + 轻盈 + 余额
            // 收益 = 月盈 +  轻盈 + 众盈 + 余额 + 提现 - 充值
            // 本公司员工 收益需要再 -薪资宝工资-代金券
            let yy = await this.mtpossessioninfo(this._productType.YY),
                qy = await this.mtpossessioninfo(this._productType.QY),
                zy = await this.queryzyaccountinfo(),
                ac = await this.getAccountInfo(),
                // 10年内1000条
                txList = await this.queryTransactionList(this._transferType.WITHDRAW, "1", 365 * 10, 1000),
                czList = await this.queryTransactionList(this._transferType.RECHARGE, "1", 365 * 10, 1000),
                xzbList = await this.queryTransactionList(this._transferType.TRANSFER, "1", 365 * 10, 1000),
                djqList = await this.rewardslist(this._rewardsSatus.used, 1000)
            tx = cz = xzb = djq = 0
            if (txList) {
                tx = txList.reduce((pre, cur) => ({ amount: parseFloat(pre.amount) + parseFloat(cur.amount) }), { amount: 0 }).amount
            }
            if (czList) {
                cz = czList.reduce((pre, cur) => ({ amount: parseFloat(pre.amount) + parseFloat(cur.amount) }), { amount: 0 }).amount
            }
            xzbList = xzbList.filter(v => v.remark === '薪资宝入账')
            if (xzbList && xzbList.length > 0) {
                xzb = xzbList.reduce((pre, cur) => ({ amount: parseFloat(pre.amount) + parseFloat(cur.amount) }), { amount: 0 }).amount
            }
            if (djqList && djqList.length > 0) {
                djq = djqList.reduce((pre, cur) => ({ amount: parseFloat(pre.amount) + parseFloat(cur.amount) }), { amount: 0 }).amount
            }
            var m = parseFloat(yy.amountPrice) + parseFloat(qy.amountPrice) + parseFloat(zy.holdAmount) + parseFloat(ac.availableBalance)
                + tx - cz - xzb - djq;
            appendMessage('你的投资总收益为：' + m.toLocaleString())
            appendMessage(`收益（${m.toLocaleString()} ） = 月盈（${yy.amountPrice.toLocaleString()} ） +  轻盈（${qy.amountPrice.toLocaleString()} ） + ` +
                `众盈（${zy.holdAmount.toLocaleString()} ） + 余额（${ac.availableBalance.toLocaleString()} ） + 提现（${tx.toLocaleString()} ） - 充值（${cz.toLocaleString()} ）` +
                `- 薪资宝入账（${xzb.toLocaleString()} ）- 代金券（${djq.toLocaleString()} ）`)
        },
        // 到期资金统计
        expireLoan: async function (productType = qydBuyer._productType.QY) {
            let items = await this.getHoldingAssignmentList(productType, 1000),
                st = {}, step = productType === this._productType.QY ? 30 : 5, sumPrin = 0;
            items = items
                .sort((a, b) => parseInt(a.remainingPeriod) > parseInt(b.remainingPeriod) ? 1 : -1)
                .map(v => ({
                    '剩余天数': parseInt(v.remainingPeriod),
                    '本金（元）': parseFloat(v.principle),
                    '收益（元）': parseFloat(v.appreciationAmount),
                    '本息合计（元）': parseFloat((parseFloat(v.principle) + parseFloat(v.appreciationAmount)).toFixed(2))
                }))

            items.forEach(v => {
                var p = Math.ceil((v['剩余天数'] / step))
                sumPrin += v['本金（元）']
                if (st[p]) {
                    st[p]['本金（元）'] = parseFloat((v['本金（元）'] + st[p]['本金（元）']).toFixed(2))
                    st[p]['收益（元）'] = parseFloat((v['收益（元）'] + st[p]['收益（元）']).toFixed(2))
                    st[p]['本息合计（元）'] = parseFloat((v['本息合计（元）'] + st[p]['本息合计（元）']).toFixed(2))
                } else {
                    st[p] = {
                        '到期（天）': p * step,
                        '本金（元）': v['本金（元）'],
                        '收益（元）': v['收益（元）'],
                        '本息合计（元）': v['本息合计（元）']
                    }
                }
            })
            for (var p in st) {
                st[p]['占比（%）'] = +(st[p]['本金（元）'] * 100 / sumPrin).toFixed(2)
            }

            console.table(Object.values(st))
            console.table(items)
        },
        // 可投资金额
        canInvest: async function () {
            let list = [],
                zy = await this.zyRemainCanInvestAmount(), // 众盈
                yy = await this.querySurplusAmount(this._productType.YY), // 月盈
                qy = await this.querySurplusAmount(this._productType.QY), // 轻盈
                yyA = await this.indexinfo(this._productType.YY), // 月盈优选
                qyA = await this.indexinfo(this._productType.QY) // 轻盈A

            appendMessage('合计可投资金额:', ((+zy.remainCanInvestAmount + (+yy.totalAmount) + (+yyA.totalAmount) + (+qy.totalAmount) + (+qyA.totalAmount)) / 10000).toLocaleString(), '万')
            list.push({
                '项目': '众盈',
                '可投金额（万）': +(zy.remainCanInvestAmount / 10000).toFixed(2),
                '年利息': zy.yearExpectProfit,
                '起投': zy.priceAmount
            }, {
                '项目': '月盈',
                '可投金额（万）': +(parseFloat(yy.totalAmount) / 10000).toFixed(2),
                '年利息': 8.1,
                '起投': 200
            }, {
                '项目': '月盈优选',
                '可投金额（万）': +(parseFloat(yyA.totalAmount) / 10000).toFixed(2),
                '年利息': `8.1 - ${yyA.highestRate} `,
                '起投': parseFloat(yyA.limitBuyAmount)
            }, {
                '项目': '轻盈',
                '可投金额（万）': +(parseFloat(qy.totalAmount) / 10000).toFixed(2),
                '年利息': 8.62,
                '起投': 200
            }, {
                '项目': '轻盈A',
                '可投金额（万）': +(+qyA.totalAmount / 10000).toFixed(2),
                '年利息': `8.62 - ${qyA.highestRate} `,
                '起投': parseFloat(qyA.limitBuyAmount)
            })
            console.table(list)
        }
    };

    (function registerPanel() {

        if (document.getElementById('_cmds_') == null) {

            var cmds = document.createElement('div')
            cmds.id = '_cmds_'
            cmds.style = 'color:#FFF;background-color:#000;border:2px solid black; z-index:999;position:fixed;height:650px;width:500px;top:50px;right:10px'
            cmds.innerHTML = `
        <div style='margin:10px'>
            <input style='margin:5px' type='button' value='轻盈A' id='_btnBuyQY'>
            <input style='margin:5px' type='button' value='月盈优选' id='_btnBuyYY'>
            <input style='margin:5px' type='button' value='密码' id='_btnInit'>
            <input style='margin:5px' type='button' value='缓存历史' id='_btnRefreshList'>
            <input style='margin:5px' type='button' value='Clear' id='_btnClear'><br/>
            <input style='margin:5px' type='button' value='智能买' id='_btnInteBuyQY'>
            <input style='margin:5px' type='button' value='两倍A' id='_btnDBuyQY'>
            <input style='margin:5px' type='button' value='四倍A' id='_btnDDBuyQY'>
            <input style='margin:5px' type='button' value='全部购买' id='_btnBuyAll'>
            <input style='margin:5px' type='button' value='停止智能' id='_btnStopInte'>
        </div>
        <div id='_message' style='height:550px;overflow-y:auto'>

        </div>
    `
            document.body.appendChild(cmds)

            document.querySelector('#_btnBuyQY').addEventListener('click', function () {
                clearTimeout(ticket)
                run2()
            })

            document.querySelector('#_btnBuyYY').addEventListener('click', function () {
                clearTimeout(ticket)
                run2(undefined, qydBuyer._productType.YY)
            })

            document.querySelector('#_btnDBuyQY').addEventListener('click', function () {
                clearTimeout(ticket)
                qydBuyer.directlyBuy(qydBuyer._amount.QY * 2)
            })

            document.querySelector('#_btnDDBuyQY').addEventListener('click', function () {
                clearTimeout(ticket)
                qydBuyer.directlyBuy(qydBuyer._amount.QY * 4)
            })

            document.querySelector('#_btnInit').addEventListener('click', function () {
                var pwd = window.prompt('请输入支付密码')
                qydBuyer.pwd(pwd)
            })

            document.querySelector('#_btnInteBuyQY').addEventListener('click', function () {
                qydBuyer.intelligenceBuy()
            })

            document.querySelector('#_btnClear').addEventListener('click', function () {
                clearMessage()
            })

            document.querySelector('#_btnStopInte').addEventListener('click', function () {
                clearTimeout(ticket)
                appendMessage('成功停止智能购买')
            })

            document.querySelector('#_btnRefreshList').addEventListener('click', function () {
                appendMessage(refreshList.join('<br>'))
            })

            document.querySelector('#_btnBuyAll').addEventListener('click', function () {
                qydBuyer.buyAll();
            })

        }

        window.qydBuyer = qydBuyer
    })()

    function appendMessage() {
        let msgEl = document.getElementById('_message'), msg = Array.from(arguments).join(' ')
        if (msgEl) {
            msgEl.innerHTML = (msgEl.innerHTML + msg + '<br>').substr(0, 5001)
        }
        console.log(msg)
        return msg
    }

    function clearMessage() {
        let el = document.getElementById('_message');
        if (el) {
            el.innerHTML = ''
        }
        console.clear()
    }



    function run2(amount = 200, productType = qydBuyer._productType.QY) {

        if (!qydBuyer._pwd || !window.md5) {
            var pwd = window.prompt('请输入支付密码')
            qydBuyer.pwd(pwd).loadMD5().then(() => {
                appendMessage(Date.now(), '开始购买')
                qydBuyer.trBuy2(productType, amount)
            })
        } else {
            appendMessage(Date.now(), '开始购买')
            qydBuyer.trBuy2(productType, amount)
        }
    }

    function intit() {
        clearMessage()
        qydBuyer.loadMD5().then(r => appendMessage('md5脚本加载完毕'));
    }


    // window.qydBuyer = qydBuyer
    intit()

    /*常用语句
    run2() //购买
    qydBuyer.statistics() //购买统计，参数可以传入 'YY','QY'
    qydBuyer.interest() //收益
    qydBuyer.expireLoan() //到期资金统计，参数可以传入 'YY','QY'
    qydBuyer.canInvest() //可投金额
    */

})()






/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
