import { Button, Form, Flex, Input, message } from "antd";
import homebck from "../images/bckgrnd.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateUser } from "../core/auth/mutation";

const QmsRecords = () => {
  const nvgate = useNavigate();
  const iuser = localStorage.getItem("isLoggedIn");
  var mapUser = JSON.parse(iuser);

  const [uname, setUname] = useState(mapUser.username);
  const [mypwd, setPwd] = useState();

  const userEditMutate = useUpdateUser();

  const onFinish = () => {
    if (!uname) {
      message.error("Username should not empty!");
    } else {
      let newObj = { id: mapUser.id, username: uname, mypassword: mypwd };
      userEditMutate.mutate(newObj, {
        onSuccess: () => {
          message.success("User details was successfully updated!");
        },
      });
    }
  };

  const boxStyle = {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  };

  return (
    <div
      className="flex h-[95vh] bg-cover"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex max-w-6xl mx-auto w-full h-full">
        <div className="py-2 px-2 border-t-4 border-t-red-800 w-full border shadow-md mt-2">
          <div className=" flex justify-between items-center">
            <div className="font-bold underline uppercase bg-lime-500 px-2 rounded-sm">
              User Credentials
            </div>
            <Button
              type="dashed"
              onClick={() => nvgate("/add-record")}
              className="bg-red-600 font-bold text-white"
            >
              Register
            </Button>
          </div>
          <div>
            <Form autoComplete="off">
              <Flex gap="small" style={boxStyle} justify="flex-start " vertical>
                <div>
                  <p>Username:</p>
                  <Input
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <p>Password:</p>
                  <Input
                    value={mypwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div>
                  <Button
                    type="primary"
                    onClick={onFinish}
                    disabled={userEditMutate.isPending}
                  >
                    {userEditMutate.isPending ? "Updating..." : "Save Update"}
                  </Button>
                </div>
              </Flex>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QmsRecords;
