import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import imageCompression from "browser-image-compression";

import Banner1 from "./assets/banner1.png";
import Banner2 from "./assets/banner2.png";
import Banner3 from "./assets/banner3.png";
import Banner4 from "./assets/banner4.png";

const SERVER = process.env.REACT_APP_SERVER;

const BANNERS1 = [
  { name: "banner1", img: Banner1 },
  { name: "banner2", img: Banner2 },
  { name: "banner3", img: Banner3 },
  { name: "banner4", img: Banner4 }
];

const BANNERS2 = [
  { name: "banner4", img: Banner4 },
  { name: "banner3", img: Banner3 },
  { name: "banner2", img: Banner2 },
  { name: "banner1", img: Banner1 }
];

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [ipAddress, setIpAddress] = useState("-1.1.1.1");
  const [imgBase64, setImgBase64] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    severity: "success",
    message: "message"
  });

  // ip
  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      const res = await fetch("https://api64.ipify.org/?format=json");
      if (res.ok) {
        const json = await res.json();
        if (json?.ip) {
          localStorage.setItem("ip", json.ip);
          const resultIP = localStorage.getItem("ip");
          if (resultIP === json.ip) {
            setIpAddress(json.ip);
          }
          console.log("resultIP: " + resultIP);
        }
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    const timeout = setInterval(async () => {
      const res = await fetch(`${SERVER}/lists?page=1`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.reverse());
      } else {
        setOpen(true);
        setSnackbar({
          severity: "error",
          message: "데이터를 가져올 수 없습니다."
        });
      }
    }, 3000);
    return () => clearInterval(timeout);
  }, []);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMB: file.size,
      fileType: file.type,
      initialQuality: 0.5,
      alwaysKeepResolution: true
    };

    const compressedImage = await imageCompression(file, options);
    const data = new FileReader();
    data.readAsDataURL(compressedImage);
    data.addEventListener("load", () => {
      const compressedSize = compressedImage.size;
      if (compressedSize < 50 * 1024) {
        setImgBase64(data.result);
      } else {
        setOpen(true);
        setSnackbar({
          severity: "error",
          message: "용량이 너무 큽니다. 50kb로 줄여주세요."
        });
      }
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async () => {
    if (text.trim() === "" && !imgBase64) {
      // 텍스트, 이미지 둘 중 하나 비어있을 시 아무 동작 안함
      return;
    }
    const res = await fetch(`${SERVER}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        content: text,
        type: imgBase64 ? "image" : "message",
        image: imgBase64 || "image test",
        user: {
          role: "user",
          ip: ipAddress,
          device_id: window.navigator.userAgent
        },
        version: "v1"
      })
    });
    if (res.ok) {
      setData((prev) => [
        ...prev,
        {
          time: Date.now(),
          content: text,
          image: imgBase64 || "image test",
          user: { ip: ipAddress }
        }
      ]);
      setText("");
      setImgBase64(null);
    } else {
      setText("");
      setImgBase64(null);
      setOpen(true);
      setSnackbar({
        severity: "error",
        message: "데이터 전송이 불가능합니다."
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {/* 광고 */}
      <Grid
        container
        item
        xs={12}
        md={12}
        lg={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {BANNERS1.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                alt={item.name}
                src={item.img}
                style={{
                  width: "18em",
                  objectFit: "contain"
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid xs={12} md={12} lg={6}>
        <Card>
          <Box
            sx={{
              backgroundImage: "url(bar2.png)",
              backgroundSize: "cover",
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography sx={{ color: "white", fontWeight: "bold" }}>
              GUZZI
            </Typography>
          </Box>
          <CardContent>
            <Box
              height="80vh"
              maxHeight="70vh" // 스크롤 가능한 최대 높이
              overflow="auto" // 내용이 컨테이너를 벗어나면 스크롤바 표시
              border="1px solid #ccc" // 보더 스타일 추가
              display="flex"
              flexDirection="column"
              sx={{ borderRadius: 1 }}
            >
              {data &&
                data.map((item) => {
                  const isMyMessage = item.user.ip === ipAddress; // 내 IP인지 여부
                  const alignment = isMyMessage ? "flex-end" : "flex-start";

                  return (
                    <Box display="flex" flexDirection="column" p={1}>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent={alignment}
                        p={1}
                      >
                        {isMyMessage === false ? (
                          <img
                            src="coin.png"
                            alt="프로필"
                            width="40"
                            height="40"
                            style={{ marginRight: "10px" }}
                          />
                        ) : null}
                        <Typography
                          sx={{
                            borderRadius: 1,
                            backgroundColor: isMyMessage
                              ? "#e3dceb"
                              : "#CED8F6",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                          }}
                          variant="body1"
                          style={{
                            padding: "10px",
                            display: "inline-block"
                          }}
                        >
                          {item.content}
                          {item.image.includes("data:image") ? (
                            <img
                              src={item.image}
                              width="150"
                              height="150"
                              alt="map안에서 채팅"
                            />
                          ) : null}
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent={alignment}
                      >
                        <Typography
                          style={{ color: "lightgray", fontSize: "13px" }}
                        >
                          {new Date(item.time).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </CardContent>
          <Divider sx={{ mb: 0 }} variant="body2" />
          {imgBase64 && (
            <img src={imgBase64} width="70" height="70" alt="이미지 미리보기" />
          )}
          <CardActions>
            <Box style={{ margin: "10px" }}>
              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  disabled={text !== ""}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                <img
                  src="plus3.png"
                  alt="이미지버튼"
                  width="30"
                  height="30"
                  style={{
                    transform: text !== "" ? "rotate(45deg)" : "none", // 텍스트가 있을 때 45도 회전
                    cursor: text !== "" ? "not-allowed" : "pointer"
                  }}
                />
              </label>
            </Box>
            <TextField
              onKeyPress={onKeyPress}
              onChange={onChange}
              value={text}
              placeholder="여기에 내용을 적어주세요"
              fullWidth
              label=""
              id="fullWidth"
              error={text.length === 0}
              disabled={imgBase64 !== null}
            />
            <Button
              size="big"
              color="primary"
              onClick={onSubmit}
              disabled={!text && !imgBase64}
            >
              SEND
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {/* 광고 */}
      <Grid
        container
        item
        xs={12}
        md={12}
        lg={3}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {BANNERS2.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              md={6}
              lg={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                alt={item.name}
                src={item.img}
                style={{ width: "18em", objectFit: "contain" }}
              />
            </Grid>
          );
        })}
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "30rem" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}

export default App;
