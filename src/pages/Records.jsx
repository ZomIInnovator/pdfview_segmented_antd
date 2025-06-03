import { useNavigate, Link } from "react-router-dom";
import homebck from "../images/bckgrnd.png";
import {
  Button,
  Table,
  Select,
  Tooltip,
  Popconfirm,
  message,
  Input,
  Space,
} from "antd";
import { useGetRecordFilter } from "../core/record/query";

import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useDeleteRecord } from "../core/record/mutation";
import { useQueryClient } from "@tanstack/react-query";
import Highlighter from "react-highlight-words";
import dayjs from "dayjs";

const Records = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("isLoggedIn"));
  const nvgate = useNavigate();

  const [txtSearch, setTxtSearch] = useState("all");

  const queryClient = useQueryClient();

  const useQueRecord = useGetRecordFilter(txtSearch);
  const useDelRecord = useDeleteRecord();

  const handleDelete = (id) => {
    useDelRecord.mutate(id, {
      onError: (e) => {
        message.error(e.response.data.message);
      },
      onSuccess: async () => {
        message.success("Successfully deleted!");
        await queryClient.invalidateQueries("getRecordFilter", "all");
      },
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "#",
      width: "10%",
      dataIndex: "ronumber",
      ...getColumnSearchProps("ronumber"),
      render: (_, data) => (
        <div className="flex flex-row uppercase">
          {data.rectype}-{data.ronumber}
        </div>
      ),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      width: "25%",
      key: "subject",
      ...getColumnSearchProps("subject"),
      render: (_, text) => (
        <div className="font-semibold uppercase text-blue-800 font-abel text-[15px]">
          <Link to={`/pdf-view/${text.id}`}>{text.subject}</Link>
        </div>
      ),
    },
    {
      title: "Reg. Date",
      render: (text) => (
        <div className="text-gray-600">
          {/* {dayjs(text).format("MMMM DD, YYYY")} */}
          {text.datereg}
        </div>
      ),
    },
    {
      title: "Date Issue",

      render: (text) => (
        <div className="text-gray-600">
          {/* {dayjs(text).format("MMMM DD, YYYY")} */}
          {text.dateissue}
        </div>
      ),
    },
    {
      title: "Activity Date",
      render: (text) => (
        <div className="text-gray-600 uppercase">
          {text.dateactivity === null
            ? "--"
            : dayjs(text.dateactivity).format("YYYY, MM-DD ")}
        </div>
      ),
    },
    {
      title: "Shelve",
      dataIndex: "shelve",
      key: "shelve",
      render: (text) => <div className="text-red-800">{text}</div>,
    },
    {
      title: "Data Man",
      dataIndex: "dataman",
      key: "dataman",
      render: (text) => <div className="text-red-800">{text}</div>,
    },
    {
      title: "Folder",
      dataIndex: "folder",
      key: "folder",
      ...getColumnSearchProps("folder"),
      render: (text) => <div className="text-red-800">{text}</div>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <div className="text-gray-600">{text}</div>,
    },

    {
      title: "Del",

      render: (_, text) => (
        <div className="text-gray-600 uppercase">
          <div className="text-red-600">
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete this file?"
                description="Are you sure to delete this file?"
                onConfirm={() => handleDelete(text.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (value) => {
    setTxtSearch(value);
  };

  useEffect(() => {
    if (!userInfo) {
      nvgate("/auth");
    }
  }, [userInfo, nvgate]);

  if (useQueRecord.isLoading)
    return (
      <div className="text-green-500 font-medium text-center">
        Loading records..
      </div>
    );

  return (
    <div
      className="flex h-[95vh] bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex max-w-6xl mx-auto w-full h-full ">
        <div className="py-2 px-2 border-t-4 border-t-red-800 w-full border shadow-md mt-2">
          <div className=" flex justify-between items-center">
            <div className="font-bold underline uppercase bg-lime-500 px-2 rounded-sm">
              Records Management
            </div>
            <Button
              type="dashed"
              onClick={() => nvgate("/add-record")}
              className="bg-red-600 font-bold text-white"
            >
              Register
            </Button>
          </div>
          <div className="flex justify-end mt-3">
            <Select
              showSearch
              placeholder="Select document type"
              optionFilterProp="label"
              onChange={onChange}
              style={{ width: "300px" }}
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "ro",
                  label: "Regional Order",
                },
                {
                  value: "rmc",
                  label: "Regional Memorandum Circular",
                },
                {
                  value: "rc",
                  label: "Regional Circular",
                },
                {
                  value: "ra",
                  label: "Regional Advisory",
                },
                {
                  value: "rm",
                  label: "Regional Memorandum",
                },
                {
                  value: "mc",
                  label: "Memorandum Circular",
                },
                {
                  value: "c",
                  label: "Circular",
                },
                {
                  value: "do",
                  label: "Department Order",
                },
                {
                  value: "qms",
                  label: "QMS",
                },
              ]}
            />
          </div>
          <div className="mt-3 border border-t-4 border-t-green-600">
            <Table
              rowKey={(useQueRecord) => useQueRecord.id}
              columns={columns}
              dataSource={useQueRecord.data}
              size="middle"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Records;
