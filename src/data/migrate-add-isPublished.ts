
/**
 * DB 마이그레이션 
 * 파일명 : scripts/migrate-add-isPublished.ts
 * 실행 : ts-node scripts/migrate-add-isPublished.ts
 */


// 주의1 : 배치(batch) 단위 처리: 한 번에 500개 이하로 나누어 작업해야 Firebase 제한 초과 방지
// 주의2 : Cloud Functions로 트리거 처리: 예를 들어 onUpdate나 onCreate 훅을 통해 처리 가능 (자동화 일부 가능)
// null 값보단 필드를 아예 안 쓰는 게 Firebase 비용 측면에서 효율적
// 마이그레이션 시 read/write 요금 발생하니 대량 문서는 주의
// 마이그레이션 시점을 배포 전에 명확히 설정해서 버전 간 데이터 구조 차이 방지


import admin from "firebase-admin";

// 서비스 계정 키로 초기화
admin.initializeApp({
   credential: admin.credential.cert(require("./serviceAccountKey.json")),
});

const db = admin.firestore();

async function migrate() {

   // 마이그레이션할 콜렉션 수정
   const snapshot = await db.collection("restaurant").get();

   for (const doc of snapshot.docs) {
      const data = doc.data();

      // 이미 있는 필드면 건너뛰기
      if (data.isPublished !== undefined) continue;

      console.log(`Updating document: ${doc.id}`);
      await doc.ref.update({
         // 마이그레이션 할 값 추가
         // isPublished: true,

      });
   }

   console.log("Migration complete ✅");
}

migrate().catch(console.error);


