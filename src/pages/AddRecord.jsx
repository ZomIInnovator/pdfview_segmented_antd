import { useEffect, useState } from "react";
import homebck from "../images/bckgrnd.png";
import {
  Form,
  Row,
  Col,
  Input,
  Upload,
  Button,
  message,
  Select,
  DatePicker,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateRecord } from "../core/record/mutation";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Option } = Select;
//const { RangePicker } = DatePicker;

export const AddRecord = () => {
  const nvgate = useNavigate();
  const [form] = Form.useForm();
  const [filecheck, setFileCheck] = useState([]);
  const [dateFolder, setDateFolder] = useState();
  const [chkRo, setChkro] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("isLoggedIn"));
  const dateFormat = "YYYY";
  const useRecordMutate = useCreateRecord();

  const onChangeFolder = (dateString) => {
    setDateFolder(dayjs(dateString, "YYYY").format("YYYY"));
  };

  const handleRecord = (e) => {
    setChkro(e);
  };

  const props = {
    onRemove: (file) => {
      const index = filecheck.indexOf(file);
      const newFileList = filecheck.slice();
      newFileList.splice(index, 1);
      setFileCheck(newFileList);
    },
    beforeUpload: (file) => {
      return new Promise((resolve) => {
        const isLt1M = file.size / 1024 / 1024 <= 5;
        if (!isLt1M) {
          message.open({
            type: "error",
            content:
              "File size exceeded must smaller or equal than 5mb capacity.",
          });
        } else {
          setFileCheck([...filecheck, file]);

          resolve(false);
        }
      });
    },

    filecheck,
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFileCheck(info.file.originFileObj);
    }
  };

  const uploadPDFile = (id) => {
    const formData = new FormData();

    filecheck.forEach((file) => {
      formData.append("recfilepdf", file);
    });
    // formData.append("attachmentx", filecheck);

    // You can use any AJAX library you like
    fetch(`https://rms.region9.dilg.gov.ph/api/recfile/attch/${id}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileCheck([]);
      })
      .catch(() => {
        message.error("upload failed.");
      });
  };

  const onFinish = (data) => {
    let authid = { authid: userInfo.id };
    let getDate = { folder: dateFolder };
  
    var addData = { ...authid, ...getDate, ...data };

    useRecordMutate.mutate(addData, {
      onSuccess: () => {
        message.success("New record was successfully added!");
      },
      onSettled: (val) => {
        uploadPDFile(val.id);
      },
    });
    form.resetFields();
  };

  useEffect(() => {
    if (!userInfo) {
      nvgate("/auth");
    }
  }, [userInfo, nvgate]);

  return (
    <div
      className="flex h-[95vh] bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex max-w-6xl mx-auto w-full h-full">
        <div className="py-2 px-2 border-t-4 border-t-red-800 w-full border shadow-md mt-2">
          <div className="font-bold underline uppercase mb-3">
            Register New Record
          </div>
          <Form
            layout="vertical"
            autoComplete="off"
            form={form}
            onFinish={onFinish}
          >
            <Row gutter={12}>
              <Col span={5}>
                <Form.Item name="dateissue" label="Date of Issuance:">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="rectype" label="Document Type">
                  <Select onChange={handleRecord} placeholder="Select doc type">
                    <Option value="ro">Regional Order</Option>
                    <Option value="rmc">Regional Memorandum Circular</Option>
                    <Option value="rc">Regional Circular</Option>
                    <Option value="ra">Regional Advisory</Option>
                    <Option value="rm">Regional Memorandum</Option>
                    <Option value="mc">Memorandum Circular</Option>
                    <Option value="c">Circular</Option>
                    <Option value="do">Department Order</Option>
                    <Option value="qms">QMS</Option>
                  </Select>
                </Form.Item>
              </Col>
              {(chkRo === "ro" && (
                <>
                  <Col span={4}>
                    <Form.Item name="ronumber" label="Number">
                      <Input placeholder="number" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="actdate" label="Activity Date">
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                </>
              )) ||
                (chkRo === "rmc" && (
                  <>
                    <Col span={4}>
                      <Form.Item name="ronumber" label="Number">
                        <Input placeholder="number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="actdate" label="Activity Date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </>
                )) ||
                (chkRo === "rc" && (
                  <>
                    <Col span={4}>
                      <Form.Item name="ronumber" label="Number">
                        <Input placeholder="number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="actdate" label="Activity Date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </>
                )) ||
                (chkRo === "mc" && (
                  <>
                    <Col span={4}>
                      <Form.Item name="ronumber" label="Number">
                        <Input placeholder="number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="actdate" label="Activity Date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </>
                )) ||
                (chkRo === "c" && (
                  <>
                    <Col span={4}>
                      <Form.Item name="ronumber" label="Number">
                        <Input placeholder="number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="actdate" label="Activity Date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </>
                )) ||
                (chkRo === "do" && (
                  <>
                    <Col span={4}>
                      <Form.Item name="ronumber" label="Number">
                        <Input placeholder="number" />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item name="actdate" label="Activity Date">
                        <Input type="date" />
                      </Form.Item>
                    </Col>
                  </>
                ))}
            </Row>
            <Row gutter={12}>
              <Col span={12}>
                <Form.Item
                  name="subject"
                  label="Subject"
                  rules={[
                    {
                      required: true,
                      message: "Please input subject!",
                    },
                  ]}
                >
                  <Input placeholder="Please enter subject" />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item name="location" label="Location">
                  <Input
                    defaultValue="Records Management Cabinet"
                    placeholder="Please enter location"
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item name="shelve" label="Shelve Type">
                  <Select placeholder="Select shelve">
                    <Option value="1st">1st</Option>
                    <Option value="2nd">2nd</Option>
                    <Option value="3rd">3rd</Option>
                    <Option value="4th">4th</Option>
                    <Option value="5th">5th</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={10}>
                <Form.Item name="dataman" label="Dataman Type">
                  <Select placeholder="Select shelve">
                    <Option value="yellow">Yellow</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="green">Green</Option>
                    <Option value="brown">Brown</Option>
                    <Option value="red">Red</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Select Year">
                  <DatePicker
                    onChange={onChangeFolder}
                    format={dateFormat}
                    picker="year"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={12}>
              <Col span={10}>
                <Upload
                  accept="application/pdf"
                  {...props}
                  onChange={handleChange}
                >
                  <Button type="dashed" icon={<UploadOutlined />}>
                    Click to Upload PDF
                  </Button>
                </Upload>
              </Col>
              <Col>
                <Button
                  htmlType="submit"
                  className="font-abel text-[15px] block w-44 bg-amber-500"
                >
                  SAVE
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
