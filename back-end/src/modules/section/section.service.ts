import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { SectionDTO } from './dto/section.dto';
import { Topic } from 'src/modules/topic/entities/topic.entity';
import { Lession } from '../lession/entities/lession.entity';

@Injectable()
export class SectionService {
    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
        @InjectRepository(Lession) private lessionRepository: Repository<Lession>,
        @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    ){}

    // Tạo Section
    async createSection(sectionDTO: SectionDTO): Promise<Section> {
        // Find the topic first
        const topic = await this.topicRepository.findOne({ where: { id: sectionDTO.topicId } });
        
        if (!topic) {
            throw new Error(`Topic with id ${sectionDTO.topicId} not found`);
        }
        
        // Create new section with the topic relation
        const section = this.sectionRepository.create({
            title: sectionDTO.title,
            description: sectionDTO.description,
            topic: topic
        });
        
        return this.sectionRepository.save(section);
    }
    
    // Lấy tất cả sections
    async findAll(): Promise<Section[]> {
        return this.sectionRepository.find({
            relations: ['topic', 'lessons']
        });
    }
    
    // Lấy section theo id
    async findOne(id: number): Promise<Section> {
        return this.sectionRepository.findOne({ 
            where: { id },
            relations: ['topic', 'lessons']
        });
    }
    
    // Lấy sections theo topicId
    async findByTopicId(topicId: number): Promise<Section[]> {
        return this.sectionRepository.find({
            where: { topic: { id: topicId } },
            //relations là lấy cả lessons luôn
            relations: ['lessons']
        });
    }
    
    // Cập nhật section
    async update(id: number, sectionDTO: SectionDTO): Promise<Section> {
        const section = await this.findOne(id);
        
        if (!section) {
            throw new Error(`Section with id ${id} not found`);
        }
        
        // Update properties
        section.title = sectionDTO.title;
        section.description = sectionDTO.description;
        
        // Update topic if changed
        if (sectionDTO.topicId && section.topic.id !== sectionDTO.topicId) {
            const topic = await this.topicRepository.findOne({ where: { id: sectionDTO.topicId } });
            if (!topic) {
                throw new Error(`Topic with id ${sectionDTO.topicId} not found`);
            }
            section.topic = topic;
        }
        
        return this.sectionRepository.save(section);
    }
    
    // Xóa section
    async remove(id: number): Promise<void> {
        const section = await this.findOne(id);
        if (!section) {
            throw new Error(`Section with id ${id} not found`);
        }
        await this.sectionRepository.remove(section);
    }



    async assignVideosToSection(sectionId: number, videoIds: string[]): Promise<Section> {
        // Tìm challenge theo ID
        const section = await this.sectionRepository.findOne({
            where: { id: sectionId },
            relations: ['lessons'],
        });
    
        if (!section) {
            throw new Error('Challenge không tồn tại');
        }
    
        // Tìm các video dựa trên IDs
        const lession = await this.lessionRepository.findByIds(videoIds);
    
        // Kiểm tra và thêm các video mới vào danh sách hiện tại
        section.lessons = [...section.lessons, ...lession];
    
        // Lưu lại challenge với các video đã gán
        return this.sectionRepository.save(section);
    }



}