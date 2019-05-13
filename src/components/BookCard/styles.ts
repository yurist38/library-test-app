export default `
* { box-sizing: border-box; }

.container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.message {
  color: var(--text-color);
  padding: 20px;
}

book-card {
  min-width: calc(33.3% - 20px);
  background-color: var(--text-color);
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.text {
  margin: 5px 0;
  line-height: 20px;
  font-size: 14px;
}

.text span {
  background-color: var(--main-color);
  color: var(--text-color);
  padding: 0 5px;
  border-radius: 5px;
  display: inline-block;
  line-height: 22px;
}

.time {
  margin-top: auto;
  text-align: right;
  font-size: 12px;
  font-style: italic;
  color: #666;
}

.time span {
  text-decoration: underline;
}

.arrow {
  display: inline-block;
  position: absolute;
  top: 50%;
  color: var(--main-color);
  font-size: 40px;
  transition: all .2s linear;
  cursor: pointer;
}

.arrow:hover {
  color: var(--active-color);
}

.arrow.left {
  left: 5%;
}

.arrow.right {
  right: 5%;
}
`;
