import app from './app';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listen in ${PORT}`);
});

export default app;