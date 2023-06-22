import { onMounted, onBeforeUnmount, reactive } from 'vue';

export default function useWindowResize() {
  const windowSize = reactive({
    width: window.innerWidth,
    height: window.innerHeight
  });

  function handleResize() {
    windowSize.width = window.innerWidth;
    windowSize.height = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  return windowSize;
}
