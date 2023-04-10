import { Cascader, CascaderProps } from 'antd';
import { useEffect, useState } from 'react';
import { getCountryList } from '@/api/process';

type ItemType = {
  countryCode: string;
  countryName: string;
  countryCn: string;
};
type PropsType = CascaderProps<ItemType> & {
  onChange?: any;
};
interface Option {
  value: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: Option[];
  // 标记是否为叶子节点，设置了 `loadData` 时有效
  // 设为 `false` 时会强制标记为父节点，即使当前节点没有 children，也会显示展开图标
  isLeaf?: boolean;
}

const SelectRegion = (props: PropsType) => {
  const [options, setOptions] = useState<Option[]>([]);
  const defaultOptions: Option = {
    value: '',
    label: '随机',
    children: [],
  };
  const initData = async () => {
    try {
      const result = await getCountryList({ codeType: 1 });
      const list = result.data.map((item: ItemType) => ({
        value: item.countryCode,
        label: item.countryCn || item.countryName,
        isLeaf: false,
        children: [],
        loading: false,
      }));
      setOptions([defaultOptions, ...list]);
    } catch (error) {}
  };
  const loadData = (selectedOptions: any[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    getCountryList({
      codeType: selectedOptions.length + 1,
      countryCode: targetOption.value,
    }).then((res: any) => {
      targetOption.loading = false;
      const list = res.data.map((item: ItemType) => ({
        value: item.countryCode,
        label: item.countryCn || item.countryName,
        children: [],
        loading: false,
      }));
      targetOption.children = [defaultOptions, ...list];
      setOptions([...options]);
    });
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <Cascader
      {...props}
      loadData={loadData}
      options={options}
      defaultValue={['']}
    ></Cascader>
  );
};

export default SelectRegion;
