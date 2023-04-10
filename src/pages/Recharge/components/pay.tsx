/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-23 19:21:18
 * @LastEditors: one
 * @LastEditTime: 2023-04-10 23:47:22
 * @FilePath: \kami-ip-client\src\pages\Recharge\components\pay.tsx
 */
import { useEffect, useState } from 'react';
import { getOrderStatus } from '@/api/process';
import erCodeImage from '@/assets/images/ercode.jpg';

export type PropsType = {
  orderInfo?: any;
  onSuccess?: any;
};
const Pay: React.FC<PropsType> = (props) => {
  const { orderInfo, onSuccess } = props;
  let timer: any = null;
  const [time, setTime] = useState(1800);
  // const [status, setStatus] = useState(0); // 0：订单进行中，2：充值成功，3：充值失败，4：订单已关闭
  // const onSubmit = async () => {
  //   if (onSuccess) {
  //     onSuccess();
  //   }
  // };
  const countDown = () => {
    timer = setInterval(() => {
      getOrderStatus(orderInfo.rechargeNo).then((res) => {
        // setStatus(res.data);
        if (res.data === 2) {
          if (onSuccess) {
            onSuccess();
          }
        }
      });
      setTime((t) => t - 1);
    }, 1000);
  };

  useEffect(() => {
    countDown();
    return () => {
      clearInterval(timer);
    };
  }, []);
  const timerStr = () => {
    let s: number | string = Math.floor(time % 60);
    let m: number | string = Math.round(time / 60);
    if (s < 10) {
      s = '0' + s;
    }
    if (m < 10) {
      m = '0' + m;
    }
    return m + ':' + s;
  };
  return (
    <div className="pay-component">
      <div className="time-show">
        支付剩余时间： {timerStr()}，充值完成自动到账
      </div>
      <div className="money-row">金额： {orderInfo.amount} USDT</div>
      <div className="type-row">类型：TRC20</div>
      <div className="ercode-img">
        <img src={erCodeImage} alt="" />
      </div>
      <div className="pay-tips">
        注意：充值类型和金额必须准确，否则充值不成功!
      </div>
    </div>
  );
};

export default Pay;
