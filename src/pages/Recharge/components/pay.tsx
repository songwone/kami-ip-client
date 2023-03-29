/*
 * @Descripttion:
 * @version:
 * @Author: songone
 * @Date: 2022-10-23 19:21:18
 * @LastEditors: songone
 * @LastEditTime: 2022-10-23 21:54:14
 * @FilePath: \kami-ip-management\src\pages\Recharge\components\pay.tsx
 */
import { useEffect, useState } from 'react';
import { getOrderStatus } from '@/api/process';

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
    return Math.floor(time / 60) + ':' + (time % 60);
  };
  return (
    <div className="pay-component">
      <div className="time-show">
        支付剩余时间： {timerStr()}，充值完成自动到账
      </div>
      <div className="money-row">金额： {orderInfo.amount} USDT</div>
      <div className="type-row">类型：TRC20</div>
      <div className="ercode-img">
        <img src="" alt="" />
      </div>
      <div className="pay-tips">
        注意：充值类型和金额必须准确，否则充值不成功!
      </div>
    </div>
  );
};

export default Pay;
