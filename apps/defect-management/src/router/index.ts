import { createRouter, createWebHistory } from 'vue-router';
import DefectTracking from '../views/DefectTracking.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/defects',
      children: [
        {
          path: '',
          name: 'defect-tracking',
          component: DefectTracking
        },
        {
          path: 'report',
          name: 'report-snag',
          component: () => import('../views/ReportSnag.vue')
        },
        {
          path: 'signoff',
          name: 'signoff',
          component: () => import('../views/Signoff.vue')
        }
      ]
    }
  ]
});

export default router;
