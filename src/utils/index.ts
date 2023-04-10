export function getUuid(len = 7, rad = 16) {
  let chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  const radix = rad || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

const getRandom = (len: number) => {
  let code = '';
  for (let i = 0; i < len; i++) {
    code += parseInt(Math.random() * 10 + '');
  }
  return code;
};

type commandParamsType = {
  username: string;
  country?: string;
  state?: string;
  city?: string;
  duration?: number;
  protocol: string;
  token?: string | null;
};
export const createAgentCommand = (params: commandParamsType, type: number) => {
  const { username, country, state, city, duration, protocol, token } = params;
  // 粘性
  // curl -v -x username-accountname-dr_country-us_state-ak_city-anchorage_sessionid-112233_duration-2_protocol-http:pikatoken@127.0.0.1:8099
  // 轮换
  // curl -v -x username-accountname-dr_country-us_state-ak_city-anchorage_protocol-http:pikatoken@127.0.0.1:8099
  let str = '';
  if (type === 1) {
    str = `curl -v -x username-${username}-dr${
      country ? '_country-' + country : ''
    }${state ? '_state-' + state : ''}${
      city ? '_city-' + city : ''
    }_protocol-${protocol}:${token}@127.0.0.1:8099`;
  } else {
    str = `curl -v -x username-${username}-dr${
      country ? '_country-' + country : ''
    }${state ? '_state-' + state : ''}${
      city ? '_city-' + city : ''
    }_sessionid-${getRandom(7)}${
      duration ? '_duration-' + duration : ''
    }_protocol-${protocol}:${token}@127.0.0.1:8099`;
  }
  return str;
};
