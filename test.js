import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },   // warm up
    { duration: '30s', target: 300 },   // ramp up
    { duration: '30s', target: 500 },   // push it
    { duration: '30s', target: 0 },     // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],   // fail if p95 goes over 500ms
    http_req_failed: ['rate<0.01'],     // fail if error rate exceeds 1%
  },
};

export default function () {
  const res = http.get('http://localhost:3000/api/your-endpoint');

  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}