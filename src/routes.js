import ProfilesList from './components/ProfilesList.vue';
import ProfileComponent from './components/ProfileComponent.vue';

export default [
  { path: '/', component: ProfilesList },
  { path: '/add', name: 'add', component: ProfileComponent },
  { path: '/update', name: 'update', component: ProfileComponent, props: true },
];
