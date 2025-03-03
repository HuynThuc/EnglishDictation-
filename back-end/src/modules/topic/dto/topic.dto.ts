export class TopicDTO {
    title: string;
  
    description: string;
  
    level: string; // Trình độ (A1-C1)
  
    totalLessons?: number; // Dấu `?` để tùy chọn, có thể không cần truyền
  
    image: string;
  }
  