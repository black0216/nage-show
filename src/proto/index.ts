// Re-export all protobuf classes and interfaces
export * from './model.js'

// Re-export the runtime for proper operation
import * as $protobuf from 'protobufjs/minimal'
export { $protobuf }