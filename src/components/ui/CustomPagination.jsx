import React from "react";
import { Pagination, ConfigProvider } from "antd";

const CustomPagination = ({ current, total, pageSize, onChange }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: "#8848ff",
            itemLinkBg: "#ffffff",
            itemBg: "#ffffff",
            itemInputBg: "#ffffff",
          },
        },
        token: {
          colorPrimary: "#8848ff",
          colorPrimaryHover: "#8848ff",
          colorBgTextHover: "#8848ff",
        },
      }}
    >
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </ConfigProvider>
  );
};

export default CustomPagination;
