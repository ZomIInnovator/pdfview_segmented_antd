
import homebck from "../images/bckgrnd.png";

import { Form, Input, Button } from "antd";
import { useLoginMutation } from "../core/auth/mutation";

const LoginAuth = () => {
  const [form] = Form.useForm();

  const loginMutation = useLoginMutation();

  const onFinish = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div
      className="flex h-screen bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-30">
        <div className="border py-2 px-2 bg-white bg-opacity-10 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              Login to your account
            </h1>
            <p className="text-lg text-white mb-4">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <Form
              className="w-full max-w-sm"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username here.." />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password here.." />
              </Form.Item>
              <Form.Item>
                <Button
                  type="dashed"
                  htmlType="submit"
                  block
                  className="bg-red-600 font-bold text-white"
                >
                  LOGIN
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAuth;
